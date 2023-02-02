import styles from "./UserGeoLocationBtn.module.scss";
import { FaLocationArrow } from "react-icons/fa";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import BroswerUserGeolocationApi from "../../pages/api/BroswerUserGeolocationApi";
import reverseGPSApi from "../../pages/api/reverseGPSApi";
import { useContext } from "react";
import { toast } from "react-toastify";

function UserGeoLocationBtn(props) {
  const { setSelected } = props; // 首頁地圖按到自己GPS定位
  const { userGPS, setUserGPS, setUserAddress, setDepartureGPS } =
    useContext(GeoLocationContext);

  async function getUserGeoLocation() {
    // 如果使用者第一次同意追蹤自己的定位
    if (!userGPS) {
      const userGeoLocationResult = await BroswerUserGeolocationApi; // 自己的GPS資料
      const result = await reverseGPSApi(userGeoLocationResult); // 轉成自己的地址
      toast("紀錄您的定位成功!");
      const address = result.results[0].formatted_address;
      setUserAddress(address); // 存入自己目前的地址
      setUserGPS(userGeoLocationResult); // 自己的Gps定位狀態
      setDepartureGPS(userGeoLocationResult); //預設導航起始點變成自己定位
    }

    setSelected(userGPS);
  }
  return (
    <button className={styles.geo_location_btn} onClick={getUserGeoLocation}>
      <FaLocationArrow size={32} color="white" />
      <div className={styles.message}>點擊追蹤您的定位</div>
    </button>
  );
}

export default UserGeoLocationBtn;
