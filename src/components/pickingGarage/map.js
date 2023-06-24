/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import closestGarage from '../../utils/closestGarage';
import {getNearbyGarageSpaces} from '../../redux/slices/garageSpacesSlice';
// import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {useRef} from 'react';
// import { useMemo } from 'react';
import GaragDetails from './garageDetailes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { kFormatDate } from '../../utils/Constants';
// import CardDetails from './card-detailes';
const Map = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.garageSpaces);
  const {geocode , startTime, endTime , duration} = useSelector(state => state.dateGeocode);
  const ref = useRef(null);
  const [id, setID] = useState('');
  const handleMarkerPress = useCallback(id => {
    ref?.current?.scrollTo(-740);
    setID(id);
  }, []);
  React.useEffect(() => {
    try {
      closestGarage().then(res => {
        dispatch(getNearbyGarageSpaces(res));
      });
    } catch (error) {
      console.log('Error fetching nearest garages:', error);
    }
  }, []);

  if (data.length <= 0) {
    return (
      <View>
        <Text>Loading ....</Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 30.0505454,
            longitude: 31.2486498,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: 30.0505454,
              longitude: 31.2486498,
            }}>
            <Image
              source={require('../../assets/imgs/marker-purple.png')}
              style={styles.markerPurpleImage}
            />
          </Marker>
          {data.map(garage => {
            // console.log(`garage data ${garage.lat}`);
            return (
              <Marker
                onPress={() => {
                  handleMarkerPress(garage.garage.id);
                }}
                key={garage.garage.id}
                description={garage.garage.garageName}
                coordinate={{
                  latitude: +garage.garage.lat,
                  longitude: +garage.garage.lon,
                }}>
                <Image
                  source={require('../../assets/imgs/marker.png')}
                  style={styles.markerImage}
                />
                <Text style={styles.price}>
                  {garage.garage.pricePerHour * 4} EGP
                </Text>
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.infoBox}>
            <Text style={styles.infoText}>{geocode.address}</Text>
          <View style={styles.line} />
          <View style={styles.timeBox}>
            <Text style={styles.time}>{kFormatDate(startTime)}</Text>
            <Text style={styles.infoText}>&gt;</Text>
            <Text style={styles.time}>{kFormatDate(endTime)}</Text>
          </View>
        </View>
        <GaragDetails ref={ref} id={id} />
      </View>
    </GestureHandlerRootView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  infoBox: {
    position: 'absolute',
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 5,
  },
  infoText: {
    fontSize: 14,
    padding: 15,
    color: '#000',
    // marginHorizontal: 15,
  },
  time: {
    fontSize: 12,
    color: '#000',
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  markerImage: {
    width: 65,
    height: 25,
    aspectRatio: 3,
    // transform: [{'scale':1}],
  },
  markerPurpleImage: {
    width: 45,
    height: 25,
  },
  price: {
    fontSize: 12,
    textAlign: 'center',
    paddingStart: 5,
    // transform: [{'rotate':'-15deg'}],
    color: '#000',
    position: 'absolute',
    top: 4,
    left: '15%',
    zIndex: 3,
  },
  bottomSheet: {
    width: '300px',
    height: '400px',
  },
  row: {
    flexDirection: "row",
    justifyContent: "start"
  }
});
