import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

import {AuthContext} from '../context';

const SignInScreen = () => {
  const [userName, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  const loginHandler = (userName, password) => {
    signIn(userName, password);
  };

  return (
    <View style={{marginTop: 100}}>
      <View>
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Sign in"
          onPress={() => loginHandler(userName, password)}
        />
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
