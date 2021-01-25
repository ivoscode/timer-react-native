import { StatusBar } from 'expo-status-bar';

import Pickers from '../components/Pickers';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

export default function Home() {
  const [remainingSeconds, setRemainingSeconds] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState('0');
  const [selectedSeconds, setSelectedSeconds] = useState('0');

  const window = useWindowDimensions();
  // 3 => 03, 10 => 10
  const formatNumber = (number) => `0${number}`.slice(-2);
  const getRemaining = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
  };

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer =
        remainingSeconds > 0 &&
        setTimeout(() => setRemainingSeconds((prev) => prev - 1), 1000);
      if (remainingSeconds === 0) {
        setTimeout(() => {
          setIsActive(false);
        }, 3000);
      }
    }
    return () => clearTimeout(timer);
  }, [isActive, remainingSeconds]);

  const { minutes, seconds } = getRemaining(remainingSeconds);
  const startButton = () => {
    return (
      <TouchableOpacity
        style={{
          ...styles.button,
          width: window.width / 2,
          height: window.width / 2,
          borderRadius: window.width / 2,
        }}
        onPress={start}
      >
        <Text style={styles.buttonText}> Start</Text>
      </TouchableOpacity>
    );
  };
  const stopButton = () => {
    return (
      <TouchableOpacity
        style={{
          ...styles.button,
          ...styles.buttonStop,
          width: window.width / 2,
          height: window.width / 2,
          borderRadius: window.width / 2,
        }}
        onPress={() => setIsActive(false)}
      >
        <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
      </TouchableOpacity>
    );
  };
  const start = () => {
    setRemainingSeconds(
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10)
    );
    setIsActive(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      {isActive ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        <Pickers
          selectedMinutes={selectedMinutes}
          setSelectedMinutes={setSelectedMinutes}
          selectedSeconds={selectedSeconds}
          setSelectedSeconds={setSelectedSeconds}
        />
      )}

      {isActive ? stopButton() : startButton()}
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
  timerText: {
    color: '#fff',
    fontSize: 90,
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
});
