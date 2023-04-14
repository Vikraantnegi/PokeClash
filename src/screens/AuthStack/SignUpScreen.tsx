import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../Navigation/AppNavigator';
import {Fonts, HelperStyles} from '../../HelperStyles';
import signUpImage from '../../assets/signup1.png';

export const SignUpScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'SignUp'>) => {
  return (
    <View style={HelperStyles.container}>
      <Image source={signUpImage} style={styles.image} />
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Welcome to PokeClash!</Text>
        <Text style={styles.subText}>
          Create your account, and begin your journey into the Pokemon universe!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingVertical: 12,
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
});

export default SignUpScreen;
