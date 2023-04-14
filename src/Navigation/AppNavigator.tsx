/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import OnBoardingScreen from '../screens/AuthStack/OnBoardingScreen';
import SignUpScreen from '../screens/AuthStack/SignUpScreen';
import LoginScreen from '../screens/AuthStack/LoginScreen';

export type ScreenParamList = {
    Splash: undefined;
    Home: undefined;
    Auth: undefined;
};

export type AuthParamList = {
  OnBoarding: undefined;
  SignUp: undefined;
  Login: undefined;
  Home: undefined;
};

const RootStack = createStackNavigator<ScreenParamList>();
const AuthStack = createStackNavigator<AuthParamList>();

const AppNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
        <RootStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
    </RootStack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{
            headerShown: false,
        }}
    >
        <AuthStack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AppNavigator;
