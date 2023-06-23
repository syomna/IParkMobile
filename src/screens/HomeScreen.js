/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {kRoutes} from '../utils/routes';
import {useNavigation} from '@react-navigation/native';
export default function HomeScreen() {
  const navigation = useNavigation();
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
  text: {textAlign: 'center'},
});
