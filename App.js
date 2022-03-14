import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, StatusBar} from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts= async() => { 
    const { status} = await Contacts.requestPermissionsAsync();
    
    if (status=== 'granted') {
      const { data } = await Contacts.getContactsAsync({fields:[Contacts.Fields.PhoneNumbers],});
      
      let info = []
      for (let person of data) {
        const firstName = (person.firstName === undefined) ? '' : person.firstName;
        const lastName = (person.lastName === undefined) ? '' : person.lastName;
        const phoneNumbers = (person.phoneNumbers === undefined) ? [] : person.phoneNumbers;
        const number = phoneNumbers.length > 0 ? phoneNumbers[0].number : ''
        info.push({id: person.id, firstName: firstName, lastName: lastName, number: number});
      }
      
      setContacts(info)
    }
    
  }

  return (
    <View style={styles.container}>
      <FlatList 
        keyExtractor={item => item.id}
        data ={contacts} 
        renderItem={({item}) => 
          <Text>{`${item.firstName} ${item.lastName} ${item.number}`}</Text>
        }/>
      <Button title="Get contacts" onPress={getContacts} />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});