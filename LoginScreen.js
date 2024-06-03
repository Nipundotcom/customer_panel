import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('password', password);
  
      const response = await axios.post('https://task.clikzopdevp.com/login.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      var data = response.data.data;
      const token  = data.token;
  
      if (token) {
        await AsyncStorage.setItem('userToken', token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid mobile number or password');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Error', 'An error occurred while logging in');
    }
  };
  

  return (
    <View>
      <Text>Mobile</Text>
      <TextInput value={mobile} onChangeText={setMobile} keyboardType="number-pad" maxLength={10} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;