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
import coverImage from '../../assets/coverImage2.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {ErrorMap} from '../../utils/validator';
import {useAuth} from '../../hooks/useAuth';
import {useDispatch} from 'react-redux';
import {setError} from '../../redux/reducers/authReducer';

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
  const {login} = useAuth();
  const dispatch = useDispatch();

  const handleInputChange = (props: TextInputChangeEvent): void => {
    const {type = '', value = ''} = props;
    setUserData(prevState => ({...prevState, [type]: value}));
  };

  const handleSubmit = async () => {
    if (username && password) {
      const loginSuccess: boolean = await login(username, password);
      if (loginSuccess) {
        navigation.navigate('Home');
      } else {
        dispatch(setError('Error logging in!'));
      }
    } else {
      setLoginErr(ErrorMap.incompeleteCreds);
    }
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
              <Text style={AuthStyles.headerText}>Chief, you are back!</Text>
              <Text style={AuthStyles.subText}>
                Go ahead and access your kingdom, your Pokemons are waiting for
                you!
              </Text>
              <View style={AuthStyles.formContainer}>
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
                  style={AuthStyles.forgotText}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  Forgot password?
                </Text>
                {errorMsg ? (
                  <Text style={AuthStyles.errorText}>{errorMsg}</Text>
                ) : null}
              </View>
              <View style={AuthStyles.actionCenter}>
                <Pressable
                  style={AuthStyles.submitCTA}
                  onPress={() => handleSubmit()}>
                  <Text style={AuthStyles.submitCTAText}>Login</Text>
                </Pressable>

                <Pressable
                  style={AuthStyles.secondaryCTA}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={AuthStyles.secondaryCTAText}>
                    New here? Sign Up!
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

export default LoginScreen;
