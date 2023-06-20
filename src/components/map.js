/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import closestGarage from '../utils/closestGarage';
import { getNearbyGarageSpaces } from '../redux/slices/garageSpacesSlice';
const Map = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.garageSpaces);
  React.useEffect(() => {
    closestGarage().then((res) => {
      dispatch(getNearbyGarageSpaces(res));
    });
  }, [dispatch]);
  if (data.length <= 0) return <View><Text>Loading ....</Text></View>
  return (
    <View style={styles.container}>
      {console.log(data)}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
      />
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>LONDON</Text>
        <View style={styles.line} />
        <View style={styles.timeBox}>
        <Text style={styles.infoText}>From {}</Text>
        <Text style={styles.infoText}>To {}</Text>
        </View>
      </View>
    </View>
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
  },
  infoBox: {
    position: 'absolute',
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    top: 20,
  },
  infoText: {
    fontSize: 20,
    padding:15,
    color:'#000',
    marginHorizontal: 15,
  },
  timeBox: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  line: {
    borderBottomWidth:1,
    borderBottomColor:'grey',
  },
});