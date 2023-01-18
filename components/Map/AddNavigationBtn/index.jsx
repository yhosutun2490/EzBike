import styles from "./AddNavigationBtn.module.scss";
import { MdOutlineDirections } from "react-icons/md";
import { useContext } from "react";
import { useRouter } from "next/router";
import { GeoLocationContext } from "../../../context/GeoLocationContext";
import reverseGPSApi from "../../../pages/api/reverseGPSApi";
function AddNavigationBtn(props) {
  const { setSearchStopAddress, setDestinationGPS } =
    useContext(GeoLocationContext);
  const route = useRouter();
  const { lat, lng } = props; // 站點本身的GPS
  const geoLocationGPS = { lat: lat, lng: lng };

  // 按到站點導航時，加入目的地地址，並導向導航頁
  async function handleAddSearchStop() {
    const result = await reverseGPSApi(geoLocationGPS);
    const address = result.results[0].formatted_address;
    setSearchStopAddress(address);
    setDestinationGPS(geoLocationGPS); // 導航終點為Ubike站點
    route.push("direction");
  }
  return (
    <button className={styles.direct_btn} onClick={handleAddSearchStop}>
      <MdOutlineDirections size={16} /> 規劃路線
    </button>
  );
}
export default AddNavigationBtn;
