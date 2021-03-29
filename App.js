import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabScreen from './components/screens/TabScreen';
import DrawerContent from './components/screens/DrawerContent';
import RootStackScreen from './components/screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from './components/context';

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        if (userName && password) {
          try {
            // userToken = 'abcd';
            // await AsyncStorage.setItem('userToken', userToken);
            let userToken;
            userToken = null;
            await fetch('http://bloodbank.clonestudiobd.com/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userName,
                password: password,
              }),
            }).then(response => {
              const getStatus = response.status;
              console.log(getStatus);
              if (getStatus === 200) {
                response
                  .json()
                  .then(async result => {
                    console.log('token', result.access_token);
                    dispatch({
                      type: 'LOGIN',
                      id: userName,
                      token: result.access_token,
                    });
                    await AsyncStorage.setItem(
                      'userToken',
                      JSON.stringify({
                        getToken: result.access_token,
                      }),
                    );
                  })
                  .catch(error => {
                    console.error(error);
                  });
              } else {
                Alert.alert(
                  'Invalid email or password!',
                  '',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={TabScreen} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
