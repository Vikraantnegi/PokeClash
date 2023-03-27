/* eslint-disable react-hooks/exhaustive-deps */
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {ScreenParamList} from '../../Navigation/AppNavigator';

const windowWidth = Dimensions.get('window').width;

const SplashScreen = ({
  navigation,
}: StackScreenProps<ScreenParamList, 'Splash'>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/splash-screen.jpg')}
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
