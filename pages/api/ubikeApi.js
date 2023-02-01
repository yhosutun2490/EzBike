import axios from "axios"
async function ubikeApi () {
  let allBikesData = await axios.get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      return err;
    });
  return allBikesData
}

export default ubikeApi