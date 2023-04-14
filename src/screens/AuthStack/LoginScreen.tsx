import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../Navigation/AppNavigator';
import {HelperStyles} from '../../HelperStyles';

export const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'Login'>) => {
  return (
    <View style={HelperStyles.container}>
      <Text>Login Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
