import {Alert, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';

async function checkLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, proceed with getting the location
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Location Permission Error:', error);
  }
}
/**
 * Get the nearest garages subject to passed origin coordinates
 * @param {number} originLong The origin longitude (default is 31.2486498)
 * @param {number} originLati The origin latitude (default is 30.0505454)
 * @param {number} distance Optional distance in meters (default is 500)
 * @returns {Array} Promise with NearestGarages list
 * @author Nader
 */

export default async function closestGarage(
  originLong = 31.2486498,
  originLati = 30.0505454,
  distance = 500,
) {
  const NearestGarages = [];
  const origin = {latitude: originLati, longitude: originLong};

  try {
    const response = await fetch(
      'https://parking-system-eaece-default-rtdb.firebaseio.com/garage-collection.json',
    );
    const garages = await response.json();
    const data = await garages;
    const travelMode = 'driving';
    // console.log(`garages ${garages}`);

    const requests = Object.keys(data).map(key => {
      let garage = {id: key, ...data[key]};

      return new Promise(resolve => {
        const destination = {latitude: garage.lat, longitude: garage.lon};
        const distanceInMeters = calculateDistance(origin, destination);

        if (distanceInMeters <= distance) {
          console.log(`yes ${garage.id}`);
          NearestGarages.push({
            garage: garage,
            distance: `${distanceInMeters} Meter`,
          });
          // console.log(NearestGarages);
        }

        resolve();
      });
    });

    await Promise.all(requests);
  } catch (error) {
    // console.log(error);
  }

  NearestGarages.map(garage => {
    console.log(`return ${garage.garage.id} ${garage.garage.lat}`);
  });
  return NearestGarages;
}

function calculateDistance(origin, destination) {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const lat1 = deg2rad(origin.latitude);
  const lon1 = deg2rad(origin.longitude);
  const lat2 = deg2rad(destination.latitude);
  const lon2 = deg2rad(destination.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c * 1000; // Convert to meters

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
/* How to use it */

// closestGarage().then(result => {
//   console.log(result);
// });
