/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [savedReminder, setSavedReminder] = useState<{
    name: string;
    date: string;
  }>({
    name: '',
    date: '',
  });
  const [date, setDate] = useState(new Date());
  const [reminder, setReminder] = useState('');
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    getReminder().then(data => {
      if (data) {
        setSavedReminder(data);
      }
    });
  }, []);

  const getReminder = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('reminder');
      console.log('JSON VAL ', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const saveReminder = async () => {
    const reminderObject = {
      name: reminder,
      date: date.toString(),
    };

    try {
      await AsyncStorage.setItem('reminder', JSON.stringify(reminderObject));
    } catch (e) {
      console.log(e);
    }

    getReminder().then(data => {
      if (data) {
        setSavedReminder(data);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a reminder"
        onChangeText={text => setReminder(text)}
        placeholderTextColor="black"
      />
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.input, {marginTop: 0}]}>
        <Text>{date ? date.toString() : 'Enter time'}</Text>
      </Pressable>

      <Button title="Save" onPress={saveReminder} />
      <View style={{flex: 1, padding: 20}}>
        <View>
          <Text style={styles.header}>Saved Reminder</Text>
          <Text>Reminder Name --- {savedReminder.name}</Text>
          <Text>Date --- {savedReminder.date}</Text>
        </View>
      </View>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    paddingBottom: 10,
  },
  input: {
    height: 40,
    margin: 25,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
  },
});