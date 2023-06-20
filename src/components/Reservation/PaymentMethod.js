import React from 'react';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {ReservationStyle} from '../../styles/ReservationsStyle';
export default function PaymentMethod({
  paymentMethod,
  isDisabled,
  handlePayment,
}) {
  return (
    <View
      style={[
        ReservationStyle.authCard,
        isDisabled ? ReservationStyle.disabledPaymentCard : null,
      ]}>
      <Text style={ReservationStyle.cardTitle}>Payment method</Text>
      <View style={ReservationStyle.radioButtonContainer}>
        <RadioButton
          value="cash"
          status={paymentMethod === 'cash' ? 'checked' : 'unchecked'}
          onPress={() => {
            if (!isDisabled) {
              handlePayment('cash');
            }
          }}
          disabled={isDisabled}
        />
        <Text
          style={[
            ReservationStyle.radioButtonLabel,
            isDisabled ? ReservationStyle.disabledPaymentLabel : null,
          ]}
          onPress={() => {
            if (!isDisabled) {
              handlePayment('cash');
            }
          }}>
          Pay in Cash
        </Text>
      </View>
      <View style={ReservationStyle.radioButtonContainer}>
        <RadioButton
          value="card"
          status={paymentMethod === 'card' ? 'checked' : 'unchecked'}
          onPress={() => {
            if (!isDisabled) {
              handlePayment('card');
            }
          }}
          disabled={isDisabled}
        />
        <Text
          style={[
            ReservationStyle.radioButtonLabel,
            isDisabled ? ReservationStyle.disabledPaymentLabel : null,
          ]}
          onPress={() => {
            if (!isDisabled) {
              handlePayment('card');
            }
          }}>
          Pay with Card
        </Text>
      </View>
    </View>
  );
}
