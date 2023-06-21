import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {kRoutes} from '../utils/routes';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate(kRoutes.home);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/logo.png')}
      />
      <Text style={styles.title}>IPark</Text>
      <Text style={styles.subtitle}>Your Parking Solution</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 4,
    fontFamily: 'nunito',
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
  },
  image: {width: 100, height: 100},
});
