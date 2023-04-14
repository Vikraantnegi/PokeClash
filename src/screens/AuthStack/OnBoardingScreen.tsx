/* eslint-disable react/no-unstable-nested-components */
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

  const swipeGestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const NextCTA = () => (
    <Pressable style={styles.next} onPress={() => toNextSlide()}>
      <Icon name="arrow-right-circle" size={60} color="#fff" />
    </Pressable>
  );

  const PrevCTA = () => (
    <Pressable style={styles.next} onPress={() => toPreviousSlide()}>
      <Icon name="arrow-left-circle" size={60} color="#fff" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {screenPosition < 3 && (
        <Text
          onPress={() => navigation.navigate('Home')}
          style={styles.skipCTA}>
          Skip
        </Text>
      )}
      <View style={styles.mainContent}>
        <View style={styles.bullets}>
          {[1, 2, 3].map((indice, index) => (
            <TouchableOpacity key={index}>
              <View
                style={[
                  styles.marker,
                  screenPosition === indice ? styles.selectedMarker : null,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.card}>
          <OnBoardCard
            position={screenPosition}
            onLeftSwipe={toNextSlide}
            onRightSwipe={toPreviousSlide}
            config={swipeGestureConfig}
          />
        </View>
      </View>
      {screenPosition === 1 ? (
        <NextCTA />
      ) : screenPosition === 2 ? (
        <View style={styles.actionCTAs}>
          <PrevCTA />
          <NextCTA />
        </View>
      ) : (
        <View style={[styles.actionCTAs, styles.signUpSection]}>
          <Pressable
            style={styles.createCTA}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createCTAText}>Create Account</Text>
          </Pressable>
          <Text style={styles.loginText}>
            Already have an account?
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.loginCTA}>
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
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#d53f27',
    position: 'relative',
  },
  skipCTA: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 16,
    fontFamily: Fonts.fontBold,
    color: '#FFF',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 40,
  },
  bullets: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
    marginLeft: 4,
  },
  marker: {
    height: 10,
    width: 10,
    backgroundColor: '#FFF',
    opacity: 0.4,
    borderWidth: 0,
    borderRadius: 5,
  },
  selectedMarker: {
    height: 40,
    opacity: 1,
  },
  card: {
    flex: 1,
  },
  next: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 10,
  },
  actionCTAs: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpSection: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  createCTA: {
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '80%',
    paddingVertical: 8,
  },
  createCTAText: {
    fontSize: 20,
    color: '#d53f27',
    textAlign: 'center',
    fontFamily: Fonts.fontBold,
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: Fonts.fontRegular,
  },
  loginCTA: {
    fontSize: 14,
    color: '#fff',
    fontFamily: Fonts.fontBold,
  },
});

export default OnBoardingScreen;
