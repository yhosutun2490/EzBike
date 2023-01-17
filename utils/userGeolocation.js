async function userGeolocation () {
  function getCoordinates() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
if ("geolocation" in navigator) {;
  const result = await getCoordinates() // 回傳使用者定位position物件
  return {lat:result.coords.latitude,lng:result.coords.longitude}
} else {
  alert("您的瀏覽器不支援定位功能")
}
}

export default userGeolocation