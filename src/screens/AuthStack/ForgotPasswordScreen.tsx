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
import coverImage from '../../assets/coverImage3.png';
import CustomFormInput from '../../components/common/CustomFormInput';
import {ErrorMap, validator} from '../../utils/validator';

interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

export const ForgotPasswordScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'ForgotPassword'>) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (props: TextInputChangeEvent): void => {
    const {type = '', value = '', validationType = ''} = props;
    setEmail(value);
    if (validationType && !validator({value, type})) {
      setEmailError(ErrorMap?.email);
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = () => {
    console.log(email);
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
              <Text style={styles.headerText}>Forgot the kingdom's key?</Text>
              <Text style={styles.subText}>
                Don’t worry Chief, we got you! Please enter the email associated
                with your account.
              </Text>
              <View style={styles.formContainer}>
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
  },
  subText: {
    fontFamily: Fonts.fontRegular,
    fontSize: 16,
    lineHeight: 20,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 8,
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

export default ForgotPasswordScreen;
