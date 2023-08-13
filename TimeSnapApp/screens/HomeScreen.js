import React, { useState, useEffect } from 'react';
import { View, Text, FlatList} from 'react-native';
import axios from 'axios';
import { Appbar, Avatar, Button, Card, } from 'react-native-paper';



const HomeScreen = ({ navigation }) => {

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  const [historicalEvents, setHistoricalEvents] = useState([]);

  useEffect(() => {

    // Define the API endpoint URL
    const apiUrl = 'http://history.muffinlabs.com/date';

    // Make the GET request using Axios
     axios.get(apiUrl)
      .then(response => {
        // Handle the successful response
        const events = response.data.data.Events;
        setHistoricalEvents(events);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching historical events:', error);
      });
    }, []);

  

  return (
    <View>
      <Appbar.Header mode='center-aligned' dark>
        <Appbar.Content title="Content" />
      </Appbar.Header>

      <FlatList
        data={historicalEvents}
        keyExtractor={(item) => item.year.toString()}
        renderItem={({ item }) => (

          <Card>
            <Card.Title title={item.year}/>
            <Card.Content>
              <Text variant="bodyMedium">{item.text}</Text>
            </Card.Content>
          </Card>

        )}
        />
    </View>
  );
};

export default HomeScreen;