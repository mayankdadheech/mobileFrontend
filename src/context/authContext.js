import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [medicinesList, setMedicinesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [selectedMedicinesContext, setSelectedMedicinesContext] = useState({});
  const [totalAmountContext, setTotalAmountContext] = useState(0);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await axios.post(`${BASE_URL}sign-in`, {
      email,
      password,
    });

    console.log('login api >> ', response.data);
    if (response.data.success) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('email', response.data.user.email);
      await AsyncStorage.setItem('fullName', response.data.user.fullname);
      setUserInfo(response.data);
    }

    return response.data;
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}sign-out`, {
        headers: {Authorization: `Bearer ${userInfo.access_token}`},
      })
      .then(res => {
        console.log(res.data);
        AsyncStorage.clear();
        setUserInfo({});
        setFullName(null);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      const access_token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('fullName');
      //   userInfo = JSON.parse(userInfo);

      if (access_token) {
        // setUserInfo(userInfo);
        setToken(access_token);
      }
      if (username) {
        setFullName(username);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const getMedicinesList = async searchKeyword => {
    setIsLoading(true);
    console.log('token ', token, searchKeyword);
    const response = await axios.get(
      `${BASE_URL}medicines/all?keyword=${searchKeyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      },
    );
    console.log(' list>>>>  ', response.data.medicines);
    setMedicinesList(response.data.medicines);
    return response.data;
  };

  const proceedToPayment = async data => {
    setIsLoading(true);
    console.log('proceedToPayment api calling ', data);
    const response = await axios.post(`${BASE_URL}payment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    console.log('response, ', response.data);

    // setMedicinesList(response.data.medicines);
    return response.data;
  };

  const getActiveTransactions = async () => {
    setIsLoading(true);

    const userEmail = await AsyncStorage.getItem('email');
    const access_token = await AsyncStorage.getItem('token');
    console.log('getActiveTransactions api calling ', userEmail, token);
    const params = {
      userEmail: userEmail,
    };
    const response = await axios.post(
      `${BASE_URL}transactions/active`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token || access_token}`,
          'content-type': 'application/json',
        },
      },
    );
    console.log('getActiveTransactions response, ', response.data);

    // setMedicinesList(response.data.medicines);
    return response.data;
  };

  const getTransactions = async data => {
    setIsLoading(true);
    const userEmail = await AsyncStorage.getItem('email');
    const access_token = await AsyncStorage.getItem('token');
    const params = {
      userEmail: userEmail,
      transactionLimit: 3,
    };
    console.log('getTransactions api calling ', params);
    const response = await axios.post(
      `${BASE_URL}transactions/details`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token || access_token}`,
          'content-type': 'application/json',
        },
      },
    );
    console.log('res.data ', response.data);
    return response.data;
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        fullName,
        splashLoading,
        medicinesList,
        selectedMedicinesContext,
        setSelectedMedicinesContext,
        totalAmountContext,
        setTotalAmountContext,
        setMedicinesList,
        register,
        login,
        logout,
        getMedicinesList,
        proceedToPayment,
        getActiveTransactions,
        getTransactions,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
