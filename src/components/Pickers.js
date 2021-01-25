import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

const Pickers = ({
  selectedMinutes,
  selectedSeconds,
  setSelectedMinutes,
  setSelectedSeconds,
}) => {
  const createArray = (length) => {
    const arr = [];
    let i = 0;
    while (i < length) {
      arr.push(i.toString());
      i += 1;
    }

    return arr;
  };

  const AVAILABLE_MINUTES = createArray(10);
  const AVAILABLE_SECONDS = createArray(60);

  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedMinutes}
        onValueChange={(itemValue) => {
          setSelectedMinutes(itemValue);
        }}
        mode='dropdown'
      >
        {AVAILABLE_MINUTES.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>minutes</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedSeconds}
        onValueChange={(itemValue) => {
          setSelectedSeconds(itemValue);
        }}
        mode='dropdown'
      >
        {AVAILABLE_SECONDS.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>seconds</Text>
    </View>
  );
};

export default Pickers;
const styles = StyleSheet.create({
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: '#07121B',
        marginLeft: 10,
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
