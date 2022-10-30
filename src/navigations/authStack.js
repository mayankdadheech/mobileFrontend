import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/loginScreen';
import HomeScreen from '../screens/homeScreen';
// import RegisterScreen from '../screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/authContext';
import OrderMedicinesScreen from '../screens/orderMecidinesScreen';
import UnderConstructionScreen from '../screens/underConstructionScreen';
import CartScreen from '../screens/cartScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {userInfo} = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      console.log('token ,', token);
      console.log('userInfo in useEffect ,', userInfo);
      if (token || userInfo.token) {
        // value previously stored
        // if (!userInfo && !userInfo.token) {
        //   setUserInfo({token: token, email: email});
        // }
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
  }, [userInfo]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="OrderMedicines"
              component={OrderMedicinesScreen}
            />
            <Stack.Screen name="labTest" component={UnderConstructionScreen} />
            <Stack.Screen
              name="bookDoctor"
              component={UnderConstructionScreen}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
