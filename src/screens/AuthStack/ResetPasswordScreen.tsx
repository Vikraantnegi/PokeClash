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
import {ErrorMap, validator} from '../../utils/validator';

interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

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
            <Image source={coverImage} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.headerText}>
                Want to reset your kingdom's key?
              </Text>
              <Text style={styles.subText}>
                Ready to create a new key? Please enter a key only that you
                know!
              </Text>
              <View style={styles.formContainer}>
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
                  placeholder="Enter your password again..."
                  secureTextEntry={true}
                  onChange={handleInputChange}
                  errorMsg={confirmPasswordErr}
                />
                <Pressable
                  style={styles.submitCTA}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.submitCTAText}>Submit</Text>
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
    flex: 1,
    gap: 20,
    paddingHorizontal: 12,
    paddingTop: 32,
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
});

export default ResetPasswordScreen;
