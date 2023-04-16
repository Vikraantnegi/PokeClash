import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {getUserName} from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const username = useSelector(getUserName);
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome Home {username}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
