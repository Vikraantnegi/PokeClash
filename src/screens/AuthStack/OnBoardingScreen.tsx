import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Fonts} from '../../HelperStyles';
import OnBoardCard from '../../components/OnBoarding/onBoardCard';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from '../../Navigation/AppNavigator';

export const OnBoardingScreen = ({
  navigation,
}: StackScreenProps<AuthParamList, 'OnBoarding'>) => {
  const [screenPosition, setScreenPosition] = useState<number>(1);

  const onSwipeRight = () => {
    if (screenPosition !== 3) {
      let currPosition = screenPosition;
      setScreenPosition(currPosition++);
    }
  };
  const onSwipeleft = () => {
    if (screenPosition !== 1) {
      let currPosition = screenPosition;
      setScreenPosition(currPosition--);
    }
  };

  const swipeGestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Home')} style={styles.Skip}>
        Skip
      </Text>
      <View style={styles.header}>
        <Text style={styles.headingText}>Welcome to</Text>
        <Text style={styles.subHeadingText}>Pokédex</Text>
      </View>
      <View style={styles.mainContent}>
        <OnBoardCard
          position={screenPosition}
          onLeftSwipe={onSwipeRight}
          onRightSwipe={onSwipeleft}
          config={swipeGestureConfig}
        />
      </View>
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
  Indices: {
    marginVertical: 20,
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Index: {
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
