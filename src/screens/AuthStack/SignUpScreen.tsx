/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {getUserName} from '../../redux/reducers/authReducer';
import {useSelector} from 'react-redux';
import {useAuth} from '../../hooks/useAuth';

interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

export const SignUpScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'SignUp'>) => {
  const loggedInUsername = useSelector(getUserName);
  const {signUp} = useAuth();
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

  const handleSubmit = async () => {
    const userObj = {
      email,
      password,
      username,
    };
    if (checkForErrors()) {
      await signUp(userObj);
    }
  };

  useEffect(() => {
    if (loggedInUsername) {
      navigation.navigate('Home');
    }
  }, [loggedInUsername]);

  const checkForErrors = (): boolean => {
    if (username && email && password && confirmPassword) {
      if (!emailErr && !passwordErr && !confirmPasswordErr) {
        return true;
      }
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
