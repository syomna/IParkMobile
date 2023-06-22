import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ReservationStyle} from '../../styles/ReservationsStyle';
import Modal from 'react-native-modal';
import AuthCard from './AuthCard';
import PaymentMethod from './PaymentMethod';
import {useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import {fetchPaymentSheetParams} from '../../services/reservationServices';
import {kRoutes} from '../../utils/routes';
import {useDispatch} from 'react-redux';
import {reserveGarage} from '../../redux/slices/ReservationSlice';

export default function BookingDetails({
  title,
  parkingFrom,
  parkingUntil,
  duration,
  pricePerHour,
  fee,
  finalPrice,
  isLogged,
  uid,
}) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isDialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initializePaymentSheet = async () => {
    const {clientSecret, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'IPark, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Yomna Salah',
        address: {
          country: 'EG', // Specify the desired country code
        },
      },
    });

    if (!error) {
      setLoading(true);
    }
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View style={ReservationStyle.container}>
      <ScrollView>
        <View style={ReservationStyle.card}>
          <View style={ReservationStyle.infoSection}>
            <Text style={ReservationStyle.title}>{title}</Text>
            <Text style={ReservationStyle.subtitle}>Abbey Street</Text>
          </View>
          <View style={ReservationStyle.row}>
            <View>
              <Text style={ReservationStyle.parking}>Parking from</Text>
              <Text style={ReservationStyle.parkingDate}>{parkingFrom}</Text>
            </View>
            <View>
              <Text style={ReservationStyle.parking}>Parking until</Text>
              <Text style={ReservationStyle.parkingDate}>{parkingUntil}</Text>
            </View>
          </View>
          <View style={ReservationStyle.durationSection}>
            <Text style={ReservationStyle.durationTime}>{duration}</Text>
            <Text style={ReservationStyle.durationTitle}>Total duration</Text>
          </View>
          <View style={ReservationStyle.priceRow}>
            <Text>Price per hour</Text>
            <Text style={ReservationStyle.price}>EGP {pricePerHour}</Text>
          </View>
          <View style={ReservationStyle.priceRow}>
            <Text>Transaction fee</Text>
            <Text style={ReservationStyle.price}>EGP {fee}</Text>
          </View>
          <View style={ReservationStyle.horizontalLine} />
          <View style={ReservationStyle.priceRow}>
            <Text style={ReservationStyle.finalPriceTitle}>Final price</Text>
            <Text style={ReservationStyle.finalPrice}>EGP {finalPrice}</Text>
          </View>
        </View>
        {!isLogged && <AuthCard />}
        <PaymentMethod
          paymentMethod={paymentMethod}
          isDisabled={!isLogged}
          handlePayment={value => {
            setPaymentMethod(value);
            if (value === 'card') {
              initializePaymentSheet().then(() => {
                if (!loading) {
                  presentPaymentSheet().then(() => {
                    dispatch(reserveGarage(0, uid, 20));
                    navigate.reset({
                      index: 0,
                      routes: [{name: kRoutes.home}],
                    });
                  });
                }
              });
            }
          }}
        />
      </ScrollView>
      {paymentMethod === 'cash' && (
        <View style={ReservationStyle.buttonView}>
          <TouchableOpacity
            style={ReservationStyle.button}
            activeOpacity={0.8}
            underlayColor="#d1d1d1"
            onPress={showDialog}
            disabled={!isLogged}>
            <Text
              style={[
                ReservationStyle.buttonText,
                !isLogged ? ReservationStyle.disabledPaymentLabel : null,
              ]}>
              EGP 55 - Reserve
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Modal isVisible={isDialogVisible}>
          <View style={ReservationStyle.dialogContainer}>
            <Text style={ReservationStyle.dialogTitle}>Reservation</Text>
            <Text>{title}</Text>
            <View style={ReservationStyle.dialogRow}>
              <Text style={ReservationStyle.dialogInfoText}>Arriving on:</Text>
              <Text style={ReservationStyle.dialogInfoText}>{parkingFrom}</Text>
            </View>
            <View style={ReservationStyle.dialogRow}>
              <Text style={ReservationStyle.dialogInfoText}>Leaving on:</Text>
              <Text style={ReservationStyle.dialogInfoText}>
                {parkingUntil}
              </Text>
            </View>
            <View style={ReservationStyle.dialogRow}>
              <Text style={ReservationStyle.dialogInfoText}>Duration:</Text>
              <Text style={ReservationStyle.dialogInfoText}>{duration}</Text>
            </View>
            <View style={ReservationStyle.dialogRow}>
              <Text style={ReservationStyle.dialogInfoText}>Final Price:</Text>
              <Text style={ReservationStyle.dialogInfoText}>
                EGP {finalPrice}
              </Text>
            </View>
            <View style={ReservationStyle.dialogButtonContainer}>
              <TouchableOpacity
                style={ReservationStyle.dialogButton}
                activeOpacity={0.8}
                underlayColor="#d1d1d1"
                onPress={hideDialog}>
                <Text style={ReservationStyle.dialogButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ReservationStyle.dialogButton}
                activeOpacity={0.8}
                underlayColor="#d1d1d1"
                onPress={() => {
                  hideDialog();
                  dispatch(reserveGarage(0, uid, 20));
                  navigate.reset({
                    index: 0,
                    routes: [{name: kRoutes.home}],
                  });
                }}>
                <Text style={ReservationStyle.dialogButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
