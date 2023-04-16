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
import coverImage from '../../assets/coverImage4.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {ErrorMap, validator} from '../../utils/validator';
import {TextInputChangeEvent} from '../../utils/interfaces';

export const ResetPasswordScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'ResetPassword'>) => {
  const [user, setUserData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    passwordErr: '',
    confirmPasswordErr: '',
  });

  const {confirmPassword, password} = user;
  const {passwordErr, confirmPasswordErr} = errors;

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
            <Image source={coverImage} style={AuthStyles.image} />
            <View style={AuthStyles.content}>
              <Text style={AuthStyles.headerText}>
                Want to reset your kingdom's key?
              </Text>
              <Text style={AuthStyles.subText}>
                Ready to create a new key? Please enter a key only that you
                know!
              </Text>
              <View style={AuthStyles.formContainer}>
                <CustomFormInput
                  name="password"
                  value={password}
                  iconName="lock"
                  placeholder="Enter a new password here..."
                  secureTextEntry={true}
                  onChange={handleInputChange}
                  validationRequired="password"
                  errorMsg={passwordErr}
                />
                <CustomFormInput
                  name="confirmPassword"
                  value={confirmPassword}
                  iconName="lock"
                  placeholder="Confirm your password..."
                  secureTextEntry={true}
                  onChange={handleInputChange}
                  errorMsg={confirmPasswordErr}
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

export default ResetPasswordScreen;
