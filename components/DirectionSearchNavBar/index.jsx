import styles from "./DirectionSearchNavBar.module.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import DirectionSearch from "../DirectionSearch";
import DirectionModeBar from "../DirectionModeBar";
import Link from "next/link";
function DirectionSearchNavBar(props) {
  const {
    setSelectedDep,
    setSelectedDest,
    setTravelMethod,
    setDirections,
    travelMethod,
    fetchGoogleDirection,
  } = props;
  return (
    <div className={styles.direction_search}>
      <div className={styles.previous_arrow}>
        <Link href={"/"}>
          <AiOutlineArrowLeft size={32} />
        </Link>
      </div>
      <div className={styles.address_search}>
        <DirectionSearch
          setSelectedDep={setSelectedDep}
          setSelectedDest={setSelectedDest}
          setTravelMethod={setTravelMethod}
          setDirections={setDirections}
        />
      </div>
      <div className={styles.travel_mode}>
        <DirectionModeBar
          setTravelMethod={setTravelMethod}
          travelMethod={travelMethod}
          setDirections={setDirections}
          fetchGoogleDirection={fetchGoogleDirection}
        />
      </div>
    </div>
  );
}

export default DirectionSearchNavBar;
