import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function ResultsScreen() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Results Screen</Text>
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
