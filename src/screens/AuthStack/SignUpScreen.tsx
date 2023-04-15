/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
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
import {Fonts, HelperStyles} from '../../HelperStyles';
import coverImage from '../../assets/signup1.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {validator, ErrorMap} from '../../utils/validator';

interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

export const SignUpScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'SignUp'>) => {
  const [user, setUserData] = useState({
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

  const {confirmPassword, username, email, password} = user;
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
    console.log(user);
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
            <Image source={coverImage} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.headerText}>Welcome to PokeClash!</Text>
              <Text style={styles.subText}>
                Create your account, and begin your journey into the Pokemon
                universe!
              </Text>
              <View style={styles.formContainer}>
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
              <View style={styles.actionCenter}>
                <Pressable
                  style={styles.submitCTA}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.submitCTAText}>Create Account</Text>
                </Pressable>

                <Pressable
                  style={styles.loginCTA}
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginCTAText}>
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
  },
  headerText: {
    fontFamily: Fonts.fontBold,
    fontSize: 24,
    lineHeight: 28,
    color: '#FFF',
    textAlign: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  subText: {
    fontFamily: Fonts.fontRegular,
    fontSize: 16,
    lineHeight: 20,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 8,
    alignSelf: 'center',
    width: '90%',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 3,
    gap: 20,
    paddingHorizontal: 12,
    paddingTop: 32,
  },
  actionCenter: {
    flex: 1,
    gap: 8,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  submitCTA: {
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 8,
    alignSelf: 'center',
  },
  submitCTAText: {
    fontSize: 20,
    color: '#d53f27',
    textAlign: 'center',
    fontFamily: Fonts.fontBold,
  },
  loginCTA: {
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#d53f27',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 8,
    alignSelf: 'center',
  },
  loginCTAText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: Fonts.fontBold,
  },
});

export default SignUpScreen;
