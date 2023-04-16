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
import coverImage from '../../assets/coverImage3.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {ErrorMap, validator} from '../../utils/validator';
import {TextInputChangeEvent} from '../../utils/interfaces';
import {useAuth} from '../../hooks/useAuth';

export const ForgotPasswordScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'ForgotPassword'>) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const {sendPasswordResetEmail} = useAuth();

  const handleInputChange = (props: TextInputChangeEvent): void => {
    const {type = '', value = '', validationType = ''} = props;
    setEmail(value);
    if (validationType && !validator({value, type})) {
      setEmailError(ErrorMap?.email);
    } else {
      setEmailError('');
    }
  };

  const navigateToLogin = () => navigation.navigate('Login');

  const handleSubmit = () => {
    sendPasswordResetEmail(email, navigateToLogin);
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
              <Text style={AuthStyles.headerText}>
                Forgot the kingdom's key?
              </Text>
              <Text style={AuthStyles.subText}>
                Don’t worry Chief, we got you! Please enter the email associated
                with your account.
              </Text>
              <View style={AuthStyles.formContainer}>
                <CustomFormInput
                  name="email"
                  value={email}
                  iconName="mail"
                  label="Please enter your account!"
                  placeholder="Enter your email here..."
                  onChange={handleInputChange}
                  validationRequired="email"
                  errorMsg={emailError}
                />
                <Pressable
                  style={AuthStyles.submitCTA}
                  onPress={() => handleSubmit()}>
                  <Text style={AuthStyles.submitCTAText}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPasswordScreen;
