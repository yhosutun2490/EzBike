async function ubikeApi () {
  let allBikesData = await fetch(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
    .then(function (response) {
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    });
  return allBikesData
}

export default ubikeApi