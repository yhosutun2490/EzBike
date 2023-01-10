import styles from "./DirectionSearch.module.scss";
import PlacesAutoComplete from "../PlacesAutocomplete";
// React Icon
import { BsCircle } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";

function DirectionSearch(props) {
  const { setSelectedDep, setSelectedDest } = props;
  return (
    <div className={styles.direction_search}>
      <div className={styles.address_dep}>
        <div className={`${styles.icon} ${styles.icon_dep}`}>
          <BsCircle size={24} color="skyblue" />
        </div>
        <PlacesAutoComplete setSelected={setSelectedDep} />
      </div>
      <div className={styles.dot_line}></div>
      <div className={styles.address_dest}>
        <div className={styles.icon}>
          <SlLocationPin size={24} />
        </div>
        <PlacesAutoComplete setSelected={setSelectedDest} />
      </div>
    </div>
  );
}
export default DirectionSearch;
