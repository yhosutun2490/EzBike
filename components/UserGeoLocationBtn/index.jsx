import styles from "./UserGeoLocationBtn.module.scss";
import { FaLocationArrow } from "react-icons/fa";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import userGeolocation from "../../utils/userGeolocation";
import { useContext } from "react";
function UserGeoLocationBtn() {
  const { setUserGPS } = useContext(GeoLocationContext);
  async function getUserGeoLocation() {
    const userGeoLocationResult = await userGeolocation();
    setUserGPS(userGeoLocationResult);
  }
  return (
    <button className={styles.geo_location_btn} onClick={getUserGeoLocation}>
      <FaLocationArrow size={32} color="white" />
      <div className={styles.message}>點擊追蹤您的定位</div>
    </button>
  );
}

export default UserGeoLocationBtn;
