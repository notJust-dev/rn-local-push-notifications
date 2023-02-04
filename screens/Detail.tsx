/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../Notification';

export default function Detail({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {savedReminder} = route.params || {};

  if (!savedReminder) {
    return (
      <SafeAreaView>
        <View style={{padding: 15}}>
          <Text>No reminder found</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            Notification.cancelNotification();
            navigation.navigate('Home', {refresh: true});
          }}
        />
      </View>
    </SafeAreaView>
  );
}
