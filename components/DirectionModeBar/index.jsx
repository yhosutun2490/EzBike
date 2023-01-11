import styles from "./DirectionModeBar.module.scss";

// React Icon
import { FaSubway } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaBusAlt } from "react-icons/fa";

function DirectionModeBar(props) {
  const { travelMethod, setTravelMethod } = props;
  function handleOnTravelBus() {
    setTravelMethod("bus");
  }
  function handleOnTravelMetro() {
    setTravelMethod("metro");
  }
  function handleOnTravelBike() {
    setTravelMethod("bike");
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
