import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import CustomButton from '../components/customButton';
import InputField from '../components/inputField';

import {AuthContext} from '../context/authContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const handleLoginAction = async () => {
    try {
      // const res = await login({
      //   email: 'hemant@gmail.com',
      //   password: 'Test@1234',
      // });
      const res = await login(email, password);
      console.log('response of login API =======================>', res);
      if (!res.success) {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('res in catch loginScreen', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          handleOnChange={value => {
            setEmail(value);
          }}
          text={email}
          label={'Email ID'}
          keyboardType="email-address"
        />

        <InputField
          handleOnChange={value => {
            setPassword(value);
          }}
          text={password}
          label={'Password'}
          inputType="password"
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={'Login'} onPress={handleLoginAction} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
