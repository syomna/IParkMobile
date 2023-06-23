/* eslint-disable prettier/prettier */

export default async function closestGarage(
  originLong = 30.075039276195568,
  originLati = 31.22181733648843,
  distance = 500
) {
  const NearestGarages = [];

  try {
    const response = await fetch(
      'https://parking-system-eaece-default-rtdb.firebaseio.com/Garages.json'
    );
    const garages = await response.json();

    const origin = {
      latitude: originLati,
      longitude: originLong,
    };

    const requests = garages.map((garage) => {
      return new Promise((resolve) => {
        const destination = {
          latitude: garage.lat,
          longitude: garage.lon,
        };

        const radlat1 = (Math.PI * origin.latitude) / 180;
        const radlat2 = (Math.PI * destination.latitude) / 180;
        const theta = origin.longitude - destination.longitude;
        const radtheta = (Math.PI * theta) / 180;
        let distanceValue =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        distanceValue =
          distanceValue > 1 ? 1 : distanceValue; // handle floating point precision issue
        distanceValue = Math.acos(distanceValue);
        distanceValue = (distanceValue * 180) / Math.PI;
        distanceValue = distanceValue * 60 * 1.1515 * 1.609344 * 1000; // Convert to meters

        if (distanceValue <= distance) {
          NearestGarages.push({
            garage: garage,
            distance: `${distanceValue} Meter`,
          });
        }

        resolve(); // Resolve the promise after processing the garage
      });
    });

    await Promise.all(requests);
  } catch (error) {
    console.log(error);
  }

  return NearestGarages;
}
/* how to use it */

/*
  closestGarage().then((result) => {
    console.log(result);
  });

*/
