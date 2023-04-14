import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../Navigation/AppNavigator';
import {Fonts, HelperStyles} from '../../HelperStyles';
import Icon from 'react-native-vector-icons/Feather';
import signUpImage from '../../assets/signup1.png';

interface TextInputChangeEvent {
  type: string;
  value: string | number;
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

  const {confirmPassword, username, email, password} = user;

  const handleInputChange = (props: TextInputChangeEvent): void => {
    const {type = '', value = ''} = props;
    setUserData(prevState => ({...prevState, [type]: value}));
  };
  return (
    <View style={[HelperStyles.container]}>
      <Image source={signUpImage} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.headerText}>Welcome to PokeClash!</Text>
        <Text style={styles.subText}>
          Create your account, and begin your journey into the Pokemon universe!
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.formElement}>
            <Text style={styles.label}>What would you like to be called?</Text>
            <Icon
              name="user"
              size={20}
              color="#d53f27"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={value =>
                handleInputChange({type: 'username', value})
              }
              value={username}
              placeholder="Enter a suitable username here..."
              maxLength={36}
            />
          </View>
          <View style={styles.formElement}>
            <Text style={styles.label}>Where should we contact you?</Text>
            <Icon
              name="mail"
              size={20}
              color="#d53f27"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange({type: 'email', value})}
              value={email}
              placeholder="Enter your email here..."
              maxLength={128}
            />
          </View>
          <View style={styles.formElement}>
            <Text style={styles.label}>Secure your account!</Text>
            <Icon
              name="lock"
              size={20}
              color="#d53f27"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={value =>
                handleInputChange({type: 'password', value})
              }
              value={password}
              secureTextEntry={true}
              placeholder="Enter your password here..."
              maxLength={128}
            />
          </View>
          <View style={styles.formElement}>
            <Text style={styles.label}>Confirm your password!</Text>
            <Icon
              name="lock"
              size={20}
              color="#d53f27"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={value =>
                handleInputChange({type: 'confirmPassword', value})
              }
              value={confirmPassword}
              secureTextEntry={true}
              placeholder="Enter your password again..."
              maxLength={128}
            />
          </View>
          <Pressable
            style={styles.submitCTA}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.submitCTAText}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: 20,
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
    lineHeight: 18,
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
    gap: 16,
    paddingHorizontal: 12,
    paddingTop: 32,
  },
  formElement: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontFamily: Fonts.fontSemi,
    fontSize: 16,
    lineHeight: 18,
    color: '#FFF',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 36,
    borderRadius: 6,
    color: '#000',
    fontFamily: Fonts.fontSemi,
    fontSize: 14,
    lineHeight: 16,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    top: 32,
    left: 8,
    zIndex: 1,
  },
  submitCTA: {
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '80%',
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 'auto',
  },
  submitCTAText: {
    fontSize: 20,
    color: '#d53f27',
    textAlign: 'center',
    fontFamily: Fonts.fontBold,
  },
});

export default SignUpScreen;
