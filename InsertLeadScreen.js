import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const InsertLeadScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [clientId, setClientId] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [client, setClient] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        'https://task.clikzopdevp.com/get-state',
        {},
        {
          headers: {token},
        },
      );
      setStates(response.data.data.map(item => item.state)); // Extract state names from the response data
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async selectedState => {
    const token = await AsyncStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('state', selectedState);

    try {
      const response = await axios.post(
        'https://task.clikzopdevp.com/get-city',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token,
          },
        },
      );
      setCities(response.data.data.map(item => item.city));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClient = async selectedState => {
    const token = await AsyncStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('state', selectedState);

    try {
      const response = await axios.post(
        'https://task.clikzopdevp.com/get-client',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token,
          },
        },
      );
      setClient(response.data.data.map(item => item.name));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsertLead = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('client_id', clientId);
      const response = await axios.post(
        'https://task.clikzopdevp.com/insert-lead',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token,
          },
        },
      );
      if(!response.data.data.error) navigation.navigate('Home');
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
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
      />
      <Text>State</Text>
      <Picker
        selectedValue={state}
        onValueChange={itemValue => {
          setState(itemValue);
          fetchCities(itemValue);
          fetchClient(itemValue);
        }}>
        {states.map((stateName, index) => (
          <Picker.Item key={index} label={stateName} value={stateName} />
        ))}
      </Picker>
      <Text>City</Text>
      <Picker
        selectedValue={city}
        onValueChange={itemValue => setCity(itemValue)}>
        {cities.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
      <Text>Client ID</Text>
      <Picker
        selectedValue={clientId}
        onValueChange={itemValue => setClientId(itemValue)}>
        {client.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
      <Button title="Insert Lead" onPress={handleInsertLead} />
    </View>
  );
};

export default InsertLeadScreen;
