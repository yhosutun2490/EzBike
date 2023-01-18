async function covertGPSApi (gpsLatLng) {
const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${gpsLatLng.lat},${gpsLatLng.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`).then(function (response) {
      return response.json()
      }).catch(function (err) {
        console.log(err);
      }) 
 return response
}

export default covertGPSApi