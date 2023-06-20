import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ReservationStyle} from '../../styles/ReservationsStyle';
import {kRoutes} from '../../utils/routes';

export default function AuthCard() {
  const navigate = useNavigation();
  return (
    <View style={ReservationStyle.authCard}>
      <Text style={ReservationStyle.cardTitle}>Personal details</Text>
      <View style={ReservationStyle.rowCenter}>
        <Text>Have an IPark account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigate.navigate(kRoutes.login);
          }}>
          <Text style={ReservationStyle.authButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={ReservationStyle.rowCenter}>
        <View style={ReservationStyle.horizontalLine} />
        <Text style={ReservationStyle.dividerTitle}>Or</Text>
        <View style={ReservationStyle.horizontalLine} />
      </View>
      <View style={ReservationStyle.rowCenter}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={ReservationStyle.authButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
