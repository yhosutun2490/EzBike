import styles from "./DirectionModeBar.module.scss";
import { toast } from "react-toastify";

// React Icon
import { FaSubway } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
// 引入起始點和目的地context
import { GeoLocationContext } from "../../context/GeoLocationContext";
import { useContext } from "react";

function DirectionModeBar(props) {
  const { travelMethod, setTravelMethod, fetchGoogleDirection } = props;
  const { departureGPS, destinationGPS } = useContext(GeoLocationContext);
  //切換交通模式時要清掉舊的指引路線
  async function handleOnTravelBus() {
    if (departureGPS === null || destinationGPS === null) {
      toast("請輸入完整起始點和目的地");
      return;
    }
    setTravelMethod("bus");
    await fetchGoogleDirection("bus");
  }
  async function handleOnTravelMetro() {
    if (departureGPS === null || destinationGPS === null) {
      toast("請輸入完整起始點和目的地");
      return;
    }
    setTravelMethod("metro");
    await fetchGoogleDirection("metro");
  }
  async function handleOnTravelBike() {
    if (departureGPS === null || destinationGPS === null) {
      toast("請輸入完整起始點和目的地");
      return;
    }
    setTravelMethod("bike");
    await fetchGoogleDirection("bike");
  }
  return (
    <div className={styles.travel_mode}>
      <FaBusAlt
        size={32}
        onClick={handleOnTravelBus}
        className={styles.travel_icon}
        color={travelMethod === "bus" ? "blue" : ""}
      />
      <FaSubway
        size={32}
        onClick={handleOnTravelMetro}
        className={styles.travel_icon}
        color={travelMethod === "metro" ? "blue" : ""}
      />
      <MdDirectionsBike
        size={32}
        onClick={handleOnTravelBike}
        className={styles.travel_icon}
        color={travelMethod === "bike" ? "blue" : ""}
      />
    </div>
  );
}

export default DirectionModeBar;
