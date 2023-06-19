import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function ReservationScreen() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Reservation Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {textAlign: 'center'},
});