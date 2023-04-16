import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {FirebaseUserObject} from '../utils/interfaces';
import {useDispatch} from 'react-redux';
import {setError, setLoggedInState} from '../redux/reducers/authReducer';

interface UserProps {
  email: string;
  password: string;
  username: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const signUp = async (userObject: UserProps) => {
    const user = await createUser(userObject);
    if (user) {
      await storeUserAtDB(user);
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
      dispatch(setError('Error adding user: username already exists'));
      return false;
    }
    return true;
  };

  const checkIfUsernameAlreadyExists = async (
    username: string,
  ): Promise<boolean> => {
    const usersCollection = firestore()?.collection('users');
    const query = usersCollection?.where('username', '==', username);
    const querySnapshot = await query.get();
    if (querySnapshot?.docs?.length > 0) {
      return true;
    }
    return false;
  };

  const storeUserAtDB = async (
    userObject: FirebaseUserObject,
  ): Promise<void> => {
    const {email, username} = userObject;
    const usersCollection = firestore().collection('users');
    await usersCollection
      .doc(userObject?.userId)
      .set(userObject)
      .then(() => {
        dispatch(setLoggedInState({email, username}));
      })
      .catch(error => {
        setError(`Error adding user: ${error?.message}`);
      });
  };

  return {signUp};
};
