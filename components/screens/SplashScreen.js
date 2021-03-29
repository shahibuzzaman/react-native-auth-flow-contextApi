import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello Splash Screen</Text>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignInScreen')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
