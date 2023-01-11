import { createContext } from "react";
import { useState } from "react";
// 設定一開始context 預設值
const defaultValue = {
  userGPS: null,  // 所有Ubikes站點資料
  departureGPS: null, // 使用者最愛的站點資料
  destinationGPS: null
}
const GeoLocationContext = createContext(defaultValue)

function GeoLocationProvider(props) {
  const {children} = props

  // 共用狀態GeoLocationContext
  const [departureGPS, setDepartureGPS] = useState(null)  // 導航出發點GPS
  const [destinationGPS,setDestinationGPS] = useState(null) // 導航終點站GPS
  const [userGPS,setUserGPS] = useState(null) // 個人資料定位GPS
  const [currentStopAddress,setCurrentStopAddress] = useState(null) //目前想要導航站點地址
  

  return (
    <GeoLocationContext.Provider value={{
     departureGPS,
     destinationGPS,
     userGPS,
     currentStopAddress,
     setDepartureGPS,
     setDestinationGPS,
     setUserGPS,
     setCurrentStopAddress
    }}>
      {children}
    </GeoLocationContext.Provider>
  )
}

export { GeoLocationProvider,GeoLocationContext}
