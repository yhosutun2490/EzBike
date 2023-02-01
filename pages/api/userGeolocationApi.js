const userGeolocationApi =  new Promise(function(resolve, reject) {
    // 如果使用者的瀏覽器有支援geolocation，回傳本身定位
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition ) {
      navigator.geolocation.getCurrentPosition((result)=> resolve({lat:result.coords.latitude,lng:result.coords.longitude},
        (err) => {
          reject(err)
        }
        ))
    }
    else {
      reject({
        message:"瀏覽器不支援定位"
      })
    }
  });



export default userGeolocationApi