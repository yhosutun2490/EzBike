import { createContext } from "react";
import { useState } from "react";
// 設定一開始context 預設值
const defaultValue = {
  allikesData: [],  // 所有Ubikes站點資料
  userFavoriteStops: null, // 使用者最愛的站點資料
}
const BikesContext = createContext(defaultValue)

function BikesDataProvider(props) {
  const {children} = props

  // 共用狀態
  const [allBikesData, setAllBikesData] = useState("")  // 所有站點資料
  const [userFavoriteStops,setUserFavoriteStops] = useState([]) // 使用者最愛站點id資料
  

  return (
    <BikesContext.Provider value={{
     allBikesData,
     setAllBikesData,
     userFavoriteStops,
     setUserFavoriteStops,    
    }}>
      {children}
    </BikesContext.Provider>
  )
}

export { BikesDataProvider,BikesContext}