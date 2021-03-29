import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {AuthContext} from '../context';

const DrawerContent = () => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello Drawer</Text>
      <Button
        title="Log Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
