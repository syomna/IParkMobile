import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import BookingDetails from '../components/Reservation/BookingDetails';
import {StripeProvider} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ReservationStyle} from '../styles/ReservationsStyle';
import {getId, logout} from '../redux/slices/AuthSlice';
export default function ReservationScreen() {
  const navigation = useNavigation();
  const {id} = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  const logoutComponent = () => {
    if (id) {
      return (
        <Text
          style={ReservationStyle.logout}
          onPress={() => {
            dispatch(logout());
            console.log(id);
          }}>
          Log Out
        </Text>
      );
    } else {
      return null;
    }
  };
  useEffect(() => {
    dispatch(getId());
    navigation.setOptions({
      title: '🔒 Secure Checkout',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#f2f3f4',
      },
      headerRight: () => logoutComponent(),
    });
    return () => {
      navigation.setOptions({
        title: undefined,
      });
    };
  });

  return (
    <StripeProvider publishableKey="pk_test_51KXpcGEcv5DBpHLpgsfICVjB9HnKnXFnzLI8QF3uYbiubSMnycqHe2regSgbh037URqiRyH8uKzN7uuaAfBLpfhJ00SBKPhAR7">
      <View style={styles.body}>
        <BookingDetails
          title="Parking on Abbey Street, SE1"
          parkingFrom="21 jun at 09:00"
          parkingUntil="21 jun at 11:00"
          duration="2 hr"
          pricePerHour={25}
          fee={5}
          finalPrice={55}
          isLogged={id ? true : false}
          uid={id}
        />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f2f3f4',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});
