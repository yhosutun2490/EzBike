import styles from "./AddNavigationBtn.module.scss";
import { MdOutlineDirections } from "react-icons/md";
import { useContext } from "react";
import { GeoLocationContext } from "../../../context/GeoLocationContext";
import reverseGPSApi from "../../../pages/api/reverseGPSApi";
function AddNavigationBtn(props) {
  const { setSearchStopAddress, setDestinationGPS } =
    useContext(GeoLocationContext);
  const { lat, lng } = props; // 站點本身的GPS
  const geoLocationGPS = { lat: lat, lng: lng };

  // 增加起始點
  async function handleAddSearchStop() {
    const result = await reverseGPSApi(geoLocationGPS);
    const address = result.results[0].formatted_address;
    setDestinationGPS(geoLocationGPS);
    setSearchStopAddress(address);
  }
  return (
    <button className={styles.direct_btn} onClick={handleAddSearchStop}>
      <MdOutlineDirections size={16} /> 規劃路線
    </button>
  );
}
export default AddNavigationBtn;
