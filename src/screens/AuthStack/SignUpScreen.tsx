/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../Navigation/AppNavigator';
import {AuthStyles, HelperStyles} from '../../HelperStyles';
import coverImage from '../../assets/coverImage1.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {validator, ErrorMap} from '../../utils/validator';
import {FirebaseUserObject} from '../../utils/interfaces';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

interface UserProps {
  emailId: string;
  pwd: string;
  userName: string;
}

export const SignUpScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'SignUp'>) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    usernameErr: '',
    emailErr: '',
    passwordErr: '',
    confirmPasswordErr: '',
  });

  const {confirmPassword, username, email, password} = userData;
  const {emailErr, passwordErr, confirmPasswordErr} = errors;

  const handleInputChange = (props: TextInputChangeEvent): void => {
    const {type = '', value = '', validationType = ''} = props;
    setUserData(prevState => ({...prevState, [type]: value}));
    if (validationType && !validator({value, type})) {
      handleError(type, false);
    } else if (type === 'confirmPassword' && password !== value) {
      handleError(type, false);
    } else {
      handleError(type, true);
    }
  };

  const handleError = (type: string, isValid: boolean): void => {
    setErrors(prevState => ({
      ...prevState,
      [`${type}Err`]: isValid ? '' : ErrorMap[type],
    }));
    return;
  };

  const handleSubmit = () => {
    const userObj = {
      emailId: email,
      pwd: password,
      userName: username,
    };
    checkForErrors() && createUser(userObj);
  };

  const checkForErrors = (): boolean => {
    if (username && email && password && confirmPassword) {
      if (!emailErr && !passwordErr && !confirmPasswordErr) {
        return true;
      }
    }
    return false;
  };

  const createUser = async ({
    emailId,
    pwd,
    userName,
  }: UserProps): Promise<void> => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        emailId,
        pwd,
      );
      const user = userCredential?.user;
      const userObj = {
        username: userName,
        email: user?.email,
        password: pwd,
        userId: user?.uid,
        isVerified: user?.emailVerified,
      };
      if (await shouldRejectUser(userObj)) {
        await user?.delete();
        console.log(`User ${user?.email} has been deleted`);
      } else {
        await storeUserAtDB(userObj);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const storeUserAtDB = async (
    userObject: FirebaseUserObject,
  ): Promise<void> => {
    const usersCollection = firestore().collection('users');
    await usersCollection
      .doc(userObject?.userId)
      .set(userObject)
      .catch(error => {
        console.log('Error adding data:', error);
      });
  };

  const shouldRejectUser = async (
    userObject: FirebaseUserObject,
  ): Promise<boolean> => {
    const usersCollection = firestore().collection('users');
    const query = usersCollection.where('username', '==', userObject?.username);
    const querySnapshot = await query.get();
    if (querySnapshot?.docs?.length > 0) {
      console.log('Error adding data: username already exists');
      return true;
    }
    return false;
  };

  return (
    <View style={[HelperStyles.container, {paddingVertical: 10}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}>
            <Image source={coverImage} style={AuthStyles.image} />
            <View style={AuthStyles.content}>
              <Text style={AuthStyles.headerText}>Welcome to PokeClash!</Text>
              <Text style={AuthStyles.subText}>
                Create your account, and begin your journey into the Pokemon
                universe!
              </Text>
              <View style={AuthStyles.formContainer}>
                <CustomFormInput
                  name="username"
                  value={username}
                  iconName="user"
                  label="What would you like to be called?"
                  placeholder="Enter a suitable username here..."
                  maxLength={36}
                  onChange={handleInputChange}
                />
                <CustomFormInput
                  name="email"
                  value={email}
                  iconName="mail"
                  label="Where should we contact you?"
                  placeholder="Enter your email here..."
                  onChange={handleInputChange}
                  validationRequired="email"
                  errorMsg={emailErr}
                />
                <CustomFormInput
                  name="password"
                  value={password}
                  iconName="lock"
                  label="Secure your account!"
                  placeholder="Enter your password here..."
                  secureTextEntry={true}
                  onChange={handleInputChange}
                  validationRequired="password"
                  errorMsg={passwordErr}
                />
                <CustomFormInput
                  name="confirmPassword"
                  value={confirmPassword}
                  iconName="lock"
                  label="Confirm your password!"
                  placeholder="Enter your password again..."
                  secureTextEntry={true}
                  onChange={handleInputChange}
                  errorMsg={confirmPasswordErr}
                />
              </View>
              <View style={AuthStyles.actionCenter}>
                <Pressable
                  style={AuthStyles.submitCTA}
                  onPress={() => handleSubmit()}>
                  <Text style={AuthStyles.submitCTAText}>Create Account</Text>
                </Pressable>

                <Pressable
                  style={AuthStyles.secondaryCTA}
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={AuthStyles.secondaryCTAText}>
                    Already have an account?
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
