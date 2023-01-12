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
  const responseYear = allBikesData[0].infoDate.slice(0, 4);
  // 公共api有時會載到2022舊資料
  if (responseYear === "2022") {
    allBikesData = await fetch(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    )
      .then(function (response) {
        return response.json();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return allBikesData
}

export default ubikeApi