import styles from "./FavoriteStopCard.module.scss";
import { GiDutchBike } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import AddFavoriteBtn from "../Map/AddFavoriteBtn";

function FavoriteStopCard(props) {
  const { stopId, stopName, rentCount, parkCount } = props;
  return (
    <div className={styles.stop_card}>
      <div className={styles.stop_name}>
        <p className={styles.stop_title}>站點名稱</p>
        <div className={styles.stop_name_detail}>{stopName}</div>
      </div>
      <div className={styles.bikes_info}>
        <div className={styles.rent_count}>
          <GiDutchBike size={24} />
          <div className={styles.count_number}>{rentCount}</div>
        </div>
        <div className={styles.park_count}>
          <FaParking size={24} />
          <div className={styles.count_number}>{parkCount}</div>
        </div>
        <div className={styles.add_fovorite_btn}>
          <AddFavoriteBtn stopsId={stopId} />
        </div>
      </div>
      <div className={styles.alert_msg}>
        {rentCount <= 3 && <p>目前車輛不足，小心借到故障車喔~!</p>}
        {parkCount <= 3 && <p>目前停車位不足，記得尋找站點備案喔~!</p>}
      </div>
    </div>
  );
}

export default FavoriteStopCard;
