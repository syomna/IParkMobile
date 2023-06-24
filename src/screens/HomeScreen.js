/* eslint-disable prettier/prettier */

import {React, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  setGeocode,
  setStartTime,
  setEndTime,
  setDuration,
} from '../redux/slices/dateGeocodeSlice';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const startDateTime = useSelector(state => state.dateGeocode.startTime);
  const endDateTime = useSelector(state => state.dateGeocode.endTime);
  const [startOpen, setStartOpen] = useState(false);
  const [endopen, setendOpen] = useState(false);
  const [locationChosen, setLocationChosen] = useState(false);
  const isFocused = useIsFocused();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (isFocused) {
      Geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.log('Error getting current location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [isFocused]);

  const dispatch = useDispatch();

  const handleShowParkingSpaces = () => {
    const currentDateTime = new Date();
    const startTime = new Date(startDateTime);
    const endTime = new Date(endDateTime);
    const minimumEndDateTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour to startDateTime

    if (locationChosen === false) {
      Alert.alert('Invalid Location', 'Please, Enter a Valid Location.');
    } else if (startTime < currentDateTime) {
      Alert.alert(
        'Invalid Parking from Time',
        'Parking from time cannot be before the current date and time.',
      );
    } else if (endTime < minimumEndDateTime) {
      Alert.alert(
        'Invalid Parking until Time',
        'Parking until time should be at least 1 hour after Parking from time.',
        [{text: 'OK'}],
      );
    } else {
      const duration = moment.duration(moment(endTime).diff(moment(startTime)));

      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();

      const durationObject = {
        days: days,
        hours: hours,
        minutes: minutes,
      };
      dispatch(setDuration(durationObject));

      // console.log('Duration:', durationObject);
      // console.log('Start Time:', startDateTime);
      // console.log('End Time:', endDateTime);
      setLocationChosen(false);
      navigation.navigate('Results');
    }
  };

  const GooglePlacesInput = () => {
    // const [currentLocation, setCurrentLocation] = useState({
    //   latitude: null,
    //   longitude: null,
    // });

    navigator.geolocation = require('react-native-geolocation-service');

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          // backgroundColor: '#fff',
          // borderRadius: 25,
          marginHorizontal: 20,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Where are you going?"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(`details ${details.formatted_address}`);
            const geocode = {
              address: details.formatted_address,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            dispatch(setGeocode(geocode));
            setLocationChosen(true); // Update locationChosen to true
          }}
          query={{
            key: 'AIzaSyDxE47Kh4gnM9Sh-Nj6vTjFzful_q7lZdY',
            language: 'en',
            components: 'country:eg',
            location: `${currentLocation.latitude || 0},${
              currentLocation.longitude || 0
            }`,
            radius: 10000,
          }}
          styles={{
            container: {
              flex: 1,
              borderRadius: 30,
            },
            textInputContainer: {
              flexDirection: 'row',
              // borderRadius: 30,
            },
            textInput: {
              backgroundColor: '#FFFFFF',
              height: 50,
              borderRadius: 30,
              paddingHorizontal: 20,
              flex: 1,
            },
            poweredContainer: {
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor: '#c8c7cc',
              borderTopWidth: 0.5,
            },
            powered: {},
            listView: {},
            row: {
              backgroundColor: '#FFFFFF',
              padding: 13,
              height: 44,
              flexDirection: 'row',
              borderRadius: 30,
            },
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
            },
            description: {},
            loader: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 20,
            },
          }}
          enablePoweredByContainer={false} // Hide "Powered by Google" attribution
          enableRefine={true} // Enable refine search option
          currentLocation={true} // Enable current location detection
          //currentLocationLabel="Current location"
          enableCurrentLocation={true} // Enable automatic retrieval of current location
          currentLocationRequest={{
            // Configure the current location retrieval options
            enableHighAccuracy: true,
            timeout: 15000,
          }}
        />
      </View>
    );
  };

  const StartDateTimePicker = () => {
    const [startDateTime, setStartDateTime] = useState(new Date());

    const handleDateConfirm = date => {
      setStartOpen(false);
      setStartDateTime(date);
      const updatedStartDateTime = moment(date).add(2, 'hours').toISOString();
      dispatch(setStartTime(updatedStartDateTime));
    };

    return (
      <View style={{width: wp('100%')}}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Parking from
        </Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setStartOpen(true)}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 18,
              marginTop: 10,
            }}>
            {new Date(startDateTime).toLocaleString([], {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <DatePicker
            modal
            open={startOpen}
            date={startDateTime}
            minimumDate={new Date()}
            onConfirm={handleDateConfirm}
            onCancel={() => setStartOpen(false)}
            androidTheme="DatePickerTheme"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const endDateTimePicker = () => {
    const [endDateTime, setendDateTime] = useState(new Date());

    const handleDateConfirm = date => {
      setendOpen(false);
      setendDateTime(date);
      const updatedEndDateTime = moment(date).add(2, 'hours').toISOString();
      dispatch(setEndTime(updatedEndDateTime));
    };

    return (
      <View style={{width: wp('100%')}}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          Parking until
        </Text>
        <TouchableOpacity style={styles.input} onPress={() => setendOpen(true)}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 18,
              marginTop: 10,
            }}>
            {new Date(endDateTime).toLocaleString([], {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <DatePicker
            modal
            open={endopen}
            date={endDateTime}
            minimumDate={
              new Date(new Date(startDateTime).getTime() - 1 * 60 * 60 * 1000)
            }
            onConfirm={handleDateConfirm}
            onCancel={() => {
              setendOpen(false);
            }}
            androidTheme="DatePickerTheme" // Apply the DatePickerTheme here
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/images/parkingSearch.jpg')}
        style={styles.backgroundImage}
        resizeMode="stretch"> */}
      <View style={styles.overlay} />
      {/* <View
        style={{
          position: 'absolute',
          top: hp('18%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.header}>Find parking in seconds</Text>
        <Text style={styles.paragraph}>
          Choose from millions of available spaces, or reserve your space in
          advance. Join over 10 million drivers enjoying easy parking.
        </Text>
      </View> */}

      <View
        style={{
          width: '95%',
          top: hp('35%'),
          position: 'absolute',
          zIndex: 1,
        }}>
        {isFocused && GooglePlacesInput()}
      </View>
      <View style={styles.inputs}>
        {StartDateTimePicker()}
        {endDateTimePicker()}
      </View>
      <View
        style={{
          position: 'absolute',
          top: hp('60%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleShowParkingSpaces}>
          <Text style={styles.buttonText}>Show Parking Spaces</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
    color: 'white',
  },
  inputs: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    // width: '100%',
    left: wp('2.75%'),
    // alignItems: 'center',
    // alignSelf:'center',
    // marginBottom: 50,
    position: 'absolute',
    top: hp('48%'),
  },
  input: {
    width: '95%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#851fbf',
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
