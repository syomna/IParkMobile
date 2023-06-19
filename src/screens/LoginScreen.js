import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
export const LoginScreen = () => {
  const loginWithEmailAndPassword = async () => {
    try {
      console.log('Clicked');
      auth()
        .signInWithEmailAndPassword('Test@gm.co', 'Test_111')
        .then(value => {
          console.log(value);
          console.log('User account created & signed in!');
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle the error appropriately
    }
  };

  return (
    <View style={styles.view}>
      <Button title="Login" onPress={loginWithEmailAndPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
