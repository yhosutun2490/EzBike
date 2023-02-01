import axios from "axios";

async function covertGPSApi (userGPS) {
let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userGPS.lat},${userGPS.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`).then(function (response) {
      return response.data
      }).catch(function (err) {
        return err;
      }) 
      return response
}

export default covertGPSApi