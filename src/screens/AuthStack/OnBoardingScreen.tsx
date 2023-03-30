/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Fonts} from '../../HelperStyles';
import OnBoardCard from '../../components/OnBoarding/onBoardCard';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../Navigation/AppNavigator';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const OnBoardingScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'OnBoarding'>) => {
  const [screenPosition, setScreenPosition] = useState<number>(1);

  const toPreviousSlide = () => {
    if (screenPosition > 1) {
      let currPosition = screenPosition - 1;
      setScreenPosition(currPosition);
    }
  };

  const toNextSlide = () => {
    if (screenPosition < 3) {
      let currPosition = screenPosition + 1;
      setScreenPosition(currPosition);
    }
  };

  const changePosition = (position: number) => {
    setScreenPosition(position);
  };

  const swipeGestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.container}>
      {screenPosition < 3 && (
        <Text onPress={() => navigation.navigate('Home')} style={styles.Skip}>
          Skip
        </Text>
      )}
      <View style={styles.header}>
        <Text style={styles.headingText}>Welcome to</Text>
        <Text style={styles.subHeadingText}>Pokédex</Text>
      </View>
      <View style={styles.mainContent}>
        <OnBoardCard
          position={screenPosition}
          onLeftSwipe={toNextSlide}
          onRightSwipe={toPreviousSlide}
          config={swipeGestureConfig}
        />
      </View>
      <View style={styles.pager}>
        {[1, 2, 3].map(indice => (
          <TouchableOpacity onPress={() => changePosition(indice)}>
            <View
              style={[
                styles.marker,
                screenPosition === indice
                  ? {backgroundColor: '#fe0000'}
                  : {backgroundColor: '#e2e2e2'},
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      {screenPosition === 1 ? (
        <Pressable style={styles.Next} onPress={() => toNextSlide()}>
          <Icon name="arrow-right-circle" size={40} color="#fe0000" />
        </Pressable>
      ) : screenPosition === 2 ? (
        <View style={styles.Actions}>
          <Pressable onPress={() => toPreviousSlide()}>
            <Icon name="arrow-left-circle" size={40} color="#fe0000" />
          </Pressable>
          <Pressable onPress={() => toNextSlide()}>
            <Icon name="arrow-right-circle" size={40} color="#fe0000" />
          </Pressable>
        </View>
      ) : (
        <View style={styles.ActionButtons}>
          <Pressable
            style={styles.Button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.ButtonText}>Create Account</Text>
          </Pressable>
          <Text style={styles.ActionText}>
            Already have an account?
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.Login}>
              {' '}
              Login!
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    paddingTop: 20,
  },
  headingText: {
    fontSize: 20,
    color: '#00041f',
    fontFamily: Fonts.fontLight,
  },
  subHeadingText: {
    fontSize: 40,
    color: '#fe0000',
    fontFamily: Fonts.fontBold,
    marginTop: -10,
  },
  mainContent: {
    marginTop: 30,
    marginHorizontal: 30,
    display: 'flex',
    height: 400,
  },
  Skip: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 14,
    fontFamily: Fonts.fontMedium,
  },
  pager: {
    marginVertical: 20,
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    height: 10,
    width: 10,
    backgroundColor: '#E2E2E2',
    borderWidth: 0,
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 3,
  },
  Next: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 10,
  },
  Actions: {
    marginTop: 'auto',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ActionButtons: {
    marginTop: 'auto',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Button: {
    borderRadius: 8,
    backgroundColor: '#fe0000',
    width: '80%',
    paddingVertical: 10,
  },
  ButtonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.fontExtraBold,
  },
  ActionText: {
    fontSize: 14,
    color: '#747476',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: Fonts.fontRegular,
  },
  Login: {
    fontSize: 14,
    color: '#17171B',
    fontFamily: Fonts.fontBold,
  },
});

export default OnBoardingScreen;
