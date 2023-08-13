import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Linking, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Appbar, Avatar, Button, Card, } from 'react-native-paper';


const HomeScreen = ({ navigation }) => {

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

    const HistoryCard = ({ event }) => {
      return (
        <Card mode='outlined'>
          <Card.Title title={event.year}/>
          <Card.Content>
            <Text variant="bodyMedium">{event.text}</Text>
            <View>
              {event.links.map((link, index) => (
                <TouchableOpacity key={index} onPress={() => Linking.openURL(link.link)}>
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                    {link.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>
      );
    };

    return (
      <View>
        <Appbar.Header mode='center-aligned' dark>
        <Appbar.Content title="Content" />
        </Appbar.Header>

        <FlatList
          data={historicalEvents}
          keyExtractor={(item) => item.year.toString()}
          renderItem={({ item }) => (
            <HistoryCard event={item} />
          )}
        />
      </View>
    );
};

export default HomeScreen;