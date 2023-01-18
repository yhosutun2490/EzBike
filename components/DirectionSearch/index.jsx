import styles from "./DirectionSearch.module.scss";
import PlacesAutoComplete from "../PlacesAutoComplete";
import { GeoLocationContext } from "../../context/GeoLocationContext";

// React Icon
import { BsCircle } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { useContext } from "react";

function DirectionSearch(props) {
  const { setSelectedDep, setSelectedDest, setTravelMethod, setDirections } =
    props;
  const { searchStopAddress } = useContext(GeoLocationContext);

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
