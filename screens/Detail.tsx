/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({route}: any) {
  const {savedReminder} = route.params;

  return (
    <SafeAreaView>
      <View style={{padding: 15}}>
        <Text>{savedReminder.name}</Text>
        <Text>{savedReminder.date}</Text>
        <View style={{marginTop: 20}} />
        <Button
          title="Delete Reminder"
          onPress={() => {
            AsyncStorage.removeItem('reminder');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
