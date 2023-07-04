/**
 * Get the nearest garages subject to passed origin coordinates
 * @param {number} originLong The origin longitude (default is 31.2486498)
 * @param {number} originLati The origin latitude (default is 30.0505454)
 * @param {number} distance Optional distance in meters (default is 500)
 * @returns {Array} Promise with NearestGarages list
 * @author Nader
 */

import axios from 'axios';

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
    // const travelMode = 'driving';
    // console.log(`garages ${garages}`);

    const requests = Object.keys(data).map(key => {
      let garage = {id: key, ...data[key]};

      return new Promise(async resolve => {
        const destination = {latitude: garage.lat, longitude: garage.lon};
        const distanceInMeters = calculateDistance(origin, destination);

        if (distanceInMeters <= distance) {
          console.log(`yes ${garage.id}`);

          const destLat = garage.lat;
          const destLon = garage.lon;

          const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLati},${originLong}&destinations=${destLat},${destLon}&mode=driving&key=AIzaSyA-7gy8MHZetTF4Yo6HOdLMqeUXuhX38rI`;

          const ress = await axios.get(apiUrl);
          console.log(ress);
          if (ress.data) {
            // const d = ress.data.rows[0].elements[0].distance.value;
            const duration = ress.data.rows[0].elements[0].duration.value; // Duration in seconds
            const durationInMinutes = Math.round(duration / 60); // Duration in minutes
            console.log(`durationInMinutes ${durationInMinutes}`);
            if (garage.approved) {
              NearestGarages.push({
                garage: garage,
                distance: `${durationInMinutes} Mins`,
              });
            }
            console.log(NearestGarages);
          }
          // const originCoordinates = `${originLati},${originLong}`; // Replace with actual origin coordinates
          // const destinationCoordinates = `${garage.lat},${garage.lon}`;
          // getDistance(originCoordinates, destinationCoordinates).then(d => {
          //   console.log(`d ${d}`);
          // });
          // NearestGarages.push({
          //   garage: garage,
          //   distance: `${distanceInMeters} Meter`,
          // });
          // console.log(NearestGarages);
          // });
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

// async function getDistance(originCoordinates, destinationCoordinates) {
//   const apiKey = 'AIzaSyDxE47Kh4gnM9Sh-Nj6vTjFzful_q7lZdY';
//   const units = 'imperial';
//   const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
//     originCoordinates,
//   )}&destinations=${encodeURIComponent(
//     destinationCoordinates,
//   )}&units=${units}&key=${apiKey}`;
//   console.log(apiUrl);

//   const response = await fetch(apiUrl);
//   const data = response.json();
//   const d = data.rows[0].elements[0].distance.value;
//   return d;
// }
/* How to use it */

// closestGarage().then(result => {
//   console.log(result);
// });

// export default async function closestGarage(
//   originLong = 31.2486498,
//   originLati = 30.0505454,
//   distance = 500,
// ) {
//   const NearestGarages = [];
//   const origin = {latitude: originLati, longitude: originLong};

//   try {
//     const response = await fetch(
//       'https://parking-system-eaece-default-rtdb.firebaseio.com/garage-collection.json',
//     );
//     const garages = await response.json();
//     const data = await garages;
//     // const travelMode = 'driving';
//     // console.log(`garages ${garages}`);

//     const requests = Object.keys(data).map(key => {
//       let garage = {id: key, ...data[key]};

//       return new Promise(resolve => {
//         const apiKey = 'AIzaSyDxE47Kh4gnM9Sh-Nj6vTjFzful_q7lZdY';
//         const originCoordinates = `${originLati},${originLong}`; // Replace with actual origin coordinates
//         const destinationCoordinates = `${garage.lat},${garage.lon}`; // Replace with actual destination coordinates
//         const units = 'imperial';

//         const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
//           originCoordinates,
//         )}&destinations=${encodeURIComponent(
//           destinationCoordinates,
//         )}&units=${units}&key=${apiKey}`;

//         // Make an HTTP request to the API endpoint
//         fetch(apiUrl)
//           .then(response => response.json())
//           .then(data => {
//             const distanceInMeters = data.rows[0].elements[0].distance.value;
//             console.log(`Distance: ${distanceInMeters} meters`);
//             if (distanceInMeters <= distance) {
//               console.log(`yes ${garage.id}`);
//               NearestGarages.push({
//                 garage: garage,
//                 distance: `${distanceInMeters} Meter`,
//               });
//               console.log(NearestGarages);
//             }
//           })
//           .catch(error => {
//             console.error(error);
//           });

//         resolve();
//       });
//     });

//     await Promise.all(requests);
//   } catch (error) {
//     // console.log(error);
//   }

//   NearestGarages.map(garage => {
//     console.log(`return ${garage.garage.id} ${garage.garage.lat}`);
//   });
//   return NearestGarages;
// }
