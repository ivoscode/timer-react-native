import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

export default function Home() {
  const window = useWindowDimensions();
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <TouchableOpacity
        style={{
          ...styles.button,
          width: window.width / 2,
          height: window.width / 2,
          borderRadius: window.width / 2,
        }}
        onPress={() => {
          return null;
        }}
      >
        <Text style={styles.buttonText}> Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 45,
    color: '#89AAFF',
  },
});
