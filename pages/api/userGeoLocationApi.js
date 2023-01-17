function userGeoLocationApi () {
  let userGps = fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,{method:'POST'}
  )
    .then(function (response) {
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    });
  return userGps
}

export default userGeoLocationApi