/* eslint-disable react-hooks/exhaustive-deps */
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ScreenParamList} from '../../Navigation/AppNavigator';
import {useSelector} from 'react-redux';
import {UserName} from '../../redux/reducers/authReducer';

const SplashScreenImage = require('../../assets/splash-screen.jpg');
const windowWidth = Dimensions.get('window')?.width;

const SplashScreen = ({
  navigation,
}: StackScreenProps<ScreenParamList, 'Splash'>) => {
  const username = useSelector(UserName);
  useEffect(() => {
    const timer = setTimeout(() => {
      username ? navigation.replace('Home') : navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container]}>
      <Animatable.Image
        delay={500}
        animation="bounceIn"
        source={SplashScreenImage}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d53f27',
  },
  logo: {
    width: windowWidth,
    height: windowWidth * 1.25,
  },
});

export default SplashScreen;
