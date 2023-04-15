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
import coverImage from '../../assets/signup2.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {ErrorMap} from '../../utils/validator';

interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

export const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'Login'>) => {
  const [user, setUserData] = useState({
    username: '',
    password: '',
  });
  const [errorMsg, setLoginErr] = useState('');

  const {username, password} = user;

  const handleInputChange = (props: TextInputChangeEvent): void => {
    const {type = '', value = ''} = props;
    setUserData(prevState => ({...prevState, [type]: value}));
  };

  const handleSubmit = () => {
    if (isAuthSuccess()) {
      setLoginErr('');
    } else {
      setLoginErr(ErrorMap.authErr);
    }
    console.log(user);
  };

  const isAuthSuccess = (): boolean => {
    console.log(username, password);
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
            <Image source={coverImage} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.headerText}>Welcome back to PokeClash!</Text>
              <Text style={styles.subText}>
                Go ahead and sign in, your Pokemons are waiting for you!
              </Text>
              <View style={styles.formContainer}>
                <CustomFormInput
                  name="username"
                  value={username}
                  iconName="user"
                  label="Enter your name, chief?"
                  placeholder="Enter your username here..."
                  maxLength={36}
                  onChange={handleInputChange}
                />
                <CustomFormInput
                  name="password"
                  value={password}
                  iconName="lock"
                  label="Enter the key to your kingdom!"
                  placeholder="Enter your password here..."
                  secureTextEntry={true}
                  onChange={handleInputChange}
                  validationRequired="password"
                />
                <Text
                  style={styles.forgotText}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  Forgot password?
                </Text>
                {errorMsg ? (
                  <Text style={styles.errorText}>{errorMsg}</Text>
                ) : null}
              </View>
              <View style={styles.actionCenter}>
                <Pressable
                  style={styles.submitCTA}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.submitCTAText}>Login</Text>
                </Pressable>

                <Pressable
                  style={styles.loginCTA}
                  onPress={() => navigation.navigate('ResetPassword')}>
                  <Text style={styles.loginCTAText}>New here? Sign Up!</Text>
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
  errorText: {
    fontFamily: Fonts.fontRegular,
    fontSize: 16,
    lineHeight: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  forgotText: {
    fontFamily: Fonts.fontSemi,
    fontSize: 14,
    lineHeight: 16,
    color: '#FFF',
    marginTop: -8,
    textAlign: 'right',
  },
});

export default LoginScreen;
