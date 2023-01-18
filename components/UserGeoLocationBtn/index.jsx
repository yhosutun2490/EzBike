import styles from "./UserGeoLocationBtn.module.scss";
import { FaLocationArrow } from "react-icons/fa";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import userGeolocation from "../../utils/userGeolocation";
import reverseGPSApi from "../../pages/api/reverseGPSApi";
import { useContext } from "react";
function UserGeoLocationBtn() {
  const { setUserGPS, setUserAddress, setDepartureGPS } =
    useContext(GeoLocationContext);
  async function getUserGeoLocation() {
    const userGeoLocationResult = await userGeolocation(); // 自己的GPS資料
    const result = await reverseGPSApi(userGeoLocationResult); // 轉成自己的地址
    const address = result.results[0].formatted_address;
    setUserAddress(address); // 存入自己目前的地址
    setUserGPS(userGeoLocationResult); // 自己的Gps定位狀態
    setDepartureGPS(userGeoLocationResult); //預設導航起始點變成自己定位
  }
  return (
    <button className={styles.geo_location_btn} onClick={getUserGeoLocation}>
      <FaLocationArrow size={32} color="white" />
      <div className={styles.message}>點擊追蹤您的定位</div>
    </button>
  );
}

export default UserGeoLocationBtn;
