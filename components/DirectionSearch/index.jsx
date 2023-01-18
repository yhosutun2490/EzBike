import styles from "./DirectionSearch.module.scss";
import PlacesAutoComplete from "../PlacesAutoComplete";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import reverseGPSApi from "../../pages/api/reverseGPSApi";

// React Icon
import { BsCircle } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { useContext } from "react";

function DirectionSearch(props) {
  const { setSelectedDep, setSelectedDest, setTravelMethod, setDirections } =
    props;
  // 如果使用者有點擊某個站點導航+自己的GPGS位置
  const { searchStopAddress, userAddress } = useContext(GeoLocationContext);

  return (
    <div className={styles.direction_search}>
      <div className={styles.address_dep}>
        <div className={`${styles.icon} ${styles.icon_dep}`}>
          <BsCircle size={24} color="skyblue" />
        </div>
        <PlacesAutoComplete
          setSelected={setSelectedDep}
          setTravelMethod={setTravelMethod}
          setDirections={setDirections}
          defaultValue={userAddress}
          dataId="departure"
        />
      </div>
      <div className={styles.dot_line}></div>
      <div className={styles.address_dest}>
        <div className={styles.icon}>
          <SlLocationPin size={24} />
        </div>
        <PlacesAutoComplete
          setSelected={setSelectedDest}
          setTravelMethod={setTravelMethod}
          setDirections={setDirections}
          dataId="destination"
          defaultValue={searchStopAddress}
        />
      </div>
    </div>
  );
}
export default DirectionSearch;
