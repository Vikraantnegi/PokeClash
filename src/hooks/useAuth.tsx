import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {FirebaseUserObject, UserProps} from '../utils/interfaces';
import {useDispatch} from 'react-redux';
import {setError, setLoggedInState} from '../redux/reducers/authReducer';
import {ErrorMap} from '../utils/validator';

export const useAuth = () => {
  const dispatch = useDispatch();
  const usersCollection = firestore().collection('users');
  const signUp = async (userObject: UserProps, callbackFunc: Function) => {
    const user = await createUser(userObject);
    if (user) {
      await storeUserAtDB(user, callbackFunc);
    }
  };

  const login = async (
    username: string,
    password: string,
    callbackFunc: Function,
  ): Promise<boolean> => {
    const email = await fetchEmailfromUsername(username);
    if (email) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        if (userCredential) {
          dispatch(setLoggedInState({email, username}));
          callbackFunc();
          return true;
        }
      } catch (error: any) {
        dispatch(setError(error?.message));
        return false;
      }
    }
    return false;
  };

  const sendPasswordResetEmail = async (
    email: string,
    callbackFunc: Function,
  ) => {
    try {
      await auth().sendPasswordResetEmail(email);
      callbackFunc();
    } catch (error: any) {
      dispatch(
        setError(`Error sending password reset email: ${error?.message}`),
      );
    }
  };

  const createUser = async (
    userObject: UserProps,
  ): Promise<FirebaseUserObject | null> => {
    const {email, password, username} = userObject;
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const userObj: FirebaseUserObject = {
        username: username,
        email: email,
        password: password,
        userId: user?.uid,
        isVerified: user?.emailVerified,
      };

      if (!(await isUserValid(userObj))) {
        await user.delete();
        dispatch(
          setError(
            `User ${user?.email} has been deleted as it already exists.`,
          ),
        );
        return null;
      }

      return userObj;
    } catch (error: any) {
      dispatch(setError(error?.message));
      return null;
    }
  };

  const isUserValid = async (
    userObject: FirebaseUserObject,
  ): Promise<boolean> => {
    const {username = ''} = userObject;
    if (await checkIfUsernameAlreadyExists(username)) {
      dispatch(setError(ErrorMap.userExists));
      return false;
    }
    return true;
  };

  const checkIfUsernameAlreadyExists = async (
    username: string,
  ): Promise<boolean> => {
    const query = usersCollection?.where('username', '==', username);
    const querySnapshot = await query.get();
    if (querySnapshot?.docs?.length > 0) {
      return true;
    }
    return false;
  };

  const storeUserAtDB = async (
    userObject: FirebaseUserObject,
    callbackFunc: Function,
  ): Promise<void> => {
    const {email, username} = userObject;
    await usersCollection
      .doc(userObject?.userId)
      .set(userObject)
      .then(() => {
        dispatch(setLoggedInState({email, username}));
        callbackFunc();
      })
      .catch(error => {
        setError(`Error adding user: ${error?.message}`);
      });
  };

  const fetchEmailfromUsername = async (username: string): Promise<string> => {
    const query = usersCollection.where('username', '==', username);
    const querySnapshot = await query.get();
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userEmail: string = userDoc.get('email');
      return userEmail;
    } else {
      dispatch(setError('User not found, Please signUp!'));
      return '';
    }
  };

  return {signUp, login, sendPasswordResetEmail};
};
