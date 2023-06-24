/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function HomeScreen() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="navigate to login"
        onPress={() => {
          navigation.navigate(kRoutes.results);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {textAlign: 'center', fontFamily: 'nunito'},
});
