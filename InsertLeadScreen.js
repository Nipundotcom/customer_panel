import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const InsertLeadScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [clientId, setClientId] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post('https://task.clikzopdevp.com/get-state', {}, {
        headers: { token }
      });
      setStates(response.data.data.map(item => item.state)); // Extract state names from the response data
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async (selectedState) => {
    const token = await AsyncStorage.getItem('userToken');
    console.log({ state: selectedState });
    const formData = new FormData();
    formData.append('state', selectedState);
    try {
      const response = await axios.post('https://task.clikzopdevp.com/get-city', formData, {
        headers: { token },
        'Content-Type': 'multipart/form-data'
      });
      console.log(response.data);
      setCities(response.data.data.map(item => item.city));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsertLead = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      await axios.post('https://task.clikzopdevp.com/insert-lead', {
        name,
        email,
        phone,
        state,
        city,
        client_id: clientId,
      }, {
        headers: { token }
      });
      Alert.alert('Success', 'Lead inserted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to insert lead');
    }
  };

  return (
    <View>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Text>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} keyboardType="number-pad" />
      <Text>State</Text>
      <Picker selectedValue={state} onValueChange={(itemValue) => {
        console.log(itemValue)
        setState(itemValue);
        fetchCities(itemValue);
      }}>
        {states.map((stateName, index) => (
          <Picker.Item key={index} label={stateName} value={stateName} />
        ))}
      </Picker>
      <Text>City</Text>
      <Picker selectedValue={city} onValueChange={(itemValue) => setCity(itemValue)}>
        {cities.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
      <Text>Client ID</Text>
      <TextInput value={clientId} onChangeText={setClientId} />
      <Button title="Insert Lead" onPress={handleInsertLead} />
    </View>
  );
};

export default InsertLeadScreen;
