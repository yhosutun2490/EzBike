import styles from "./AddDepartureBtn.module.scss";
import { MdOutlineDirections } from "react-icons/md";
import { useContext } from "react";
import { GeoLocationContext } from "../../../context/GeoLocationContext";
function AddDepartureBtn(props) {
  const setDestinationGPS = useContext(GeoLocationContext).setDestinationGPS;
  const { lat, lng } = props; // 站點本身的GPS
  const geoLocationGPS = { lat: lat, lng: lng };

  // 增加起始點
  async function handleAddInitialStop() {
    setDestinationGPS(geoLocationGPS);
    alert("增加路線起點成功");
  }
  return (
    <button className={styles.direct_btn} onClick={handleAddInitialStop}>
      <MdOutlineDirections size={16} /> 加入起點
    </button>
  );
}
export default AddDepartureBtn;
