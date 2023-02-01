import { createContext } from "react";
import { useState } from "react";
// 設定一開始context 預設值
const defaultValue = {
  userFavoriteStops: [], // 使用者最愛的站點資料
}
const BikesContext = createContext(defaultValue)

function BikesDataProvider(props) {
  const {children} = props

  // 共用狀態
  const [userFavoriteStops,setUserFavoriteStops] = useState([]) // 使用者最愛站點id資料
  

  return (
    <BikesContext.Provider value={{
     userFavoriteStops,
     setUserFavoriteStops,    
    }}>
      {children}
    </BikesContext.Provider>
  )
}

export { BikesDataProvider,BikesContext}