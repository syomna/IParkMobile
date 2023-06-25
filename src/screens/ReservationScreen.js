import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import BookingDetails from '../components/Reservation/BookingDetails';
import {StripeProvider} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ReservationStyle} from '../styles/ReservationsStyle';
import {getId, logout} from '../redux/slices/AuthSlice';
import {
  kCalculatePrice,
  kFormatDate,
  kFormatDuration,
} from '../utils/Constants';
export default function ReservationScreen() {
  const navigation = useNavigation();
  const {id} = useSelector(state => state.authSlice);
  const {garage} = useSelector(state => state.selectedGarage);
  const {startTime, endTime, duration} = useSelector(
    state => state.dateGeocode,
  );
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
          title={garage.garageName}
          address={garage.address}
          parkingFrom={kFormatDate(startTime)}
          parkingUntil={kFormatDate(endTime)}
          duration={kFormatDuration(duration)}
          pricePerHour={garage.pricePerHour}
          fee={5}
          finalPrice={kCalculatePrice(duration, garage.pricePerHour, 5)}
          isLogged={id ? true : false}
          uid={id}
          garageId={garage.id}
          availableSpots={garage.availableSpots}
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
