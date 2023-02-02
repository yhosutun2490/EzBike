import styles from "./DirectionModeBar.module.scss";

// React Icon
import { FaSubway } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";
// material UI
import { Button, Tooltip } from "@mui/material";
// 引入起始點和目的地context
import { GeoLocationContext } from "../../context/GeoLocationContext";
import { useContext } from "react";

function DirectionModeBar(props) {
  const { travelMethod, setTravelMethod, fetchGoogleDirection } = props;
  const { departureGPS, destinationGPS } = useContext(GeoLocationContext);
  //切換交通模式時要清掉舊的指引路線
  async function handleOnTravelBus() {
    if (departureGPS === null || destinationGPS === null) {
      alert("請輸入完整起始點和目的地");
      return;
    }
    setTravelMethod("bus");
    await fetchGoogleDirection("bus");
  }
  async function handleOnTravelMetro() {
    if (departureGPS === null || destinationGPS === null) {
      alert("請輸入完整起始點和目的地");
      return;
    }
    setTravelMethod("metro");
    await fetchGoogleDirection("metro");
  }
  async function handleOnTravelBike() {
    if (departureGPS === null || destinationGPS === null) {
      alert("請輸入完整起始點和目的地");
      return;
    }
    setTravelMethod("bike");
    await fetchGoogleDirection("bike");
  }
  return (
    <div className={styles.travel_mode}>
      <Tooltip title="公車" placement="left-start">
        <Button
          variant="contained"
          onClick={handleOnTravelBus}
          style={{ borderRadius: 10 }}
        >
          <FaBusAlt
            size={32}
            className={styles.travel_icon}
            color={travelMethod === "bus" ? "blue" : ""}
          />
        </Button>
      </Tooltip>
      <Tooltip title="捷運" placement="left-start">
        <Button
          variant="contained"
          onClick={handleOnTravelMetro}
          style={{ borderRadius: 10 }}
        >
          <FaSubway
            size={32}
            className={styles.travel_icon}
            color={travelMethod === "metro" ? "blue" : ""}
          />
        </Button>
      </Tooltip>
      <Tooltip title="單車" placement="left-start">
        <Button
          variant="contained"
          onClick={handleOnTravelBike}
          style={{ borderRadius: 10 }}
        >
          <MdDirectionsBike
            size={32}
            className={styles.travel_icon}
            color={travelMethod === "bike" ? "blue" : ""}
          />
        </Button>
      </Tooltip>
    </div>
  );
}

export default DirectionModeBar;
