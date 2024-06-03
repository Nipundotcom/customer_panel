import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const token = await AsyncStorage.getItem('userToken');
      try {
        const response = await axios.post('https://task.clikzopdevp.com/get-lead', {}, {
          headers: { token }
        });
        // console.log(response.data.data);
        setLeads(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStates();
  }, []);

  return (
    <View>
      <Text>Leads</Text>
      {leads.map((state, index) => (
        <Text key={index}>Lead name : {state.name}</Text>
      ))}
      <Button title="Insert Lead" onPress={() => navigation.navigate('InsertLead')} />
    </View>
  );
};

export default HomeScreen;