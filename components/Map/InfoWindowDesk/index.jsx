import styles from "./InfoWindowDesk.module.scss";
import { GiDutchBike } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import AddFavoriteBtn from "../AddFavoriteBtn";

function InfoWindowDesk(props) {
  const { id, ar, aren, sbi, bemp, updateTime, lat, lng } = props;
  return (
    <div className={styles["info-window"]}>
      <div className={styles["stop-name"]}>
        <p>站點名</p>
        <p>{ar}</p>
      </div>
      <div className={styles["stop-address"]}>
        <p>地址</p>
        <p>{aren}</p>
      </div>
      <div className={styles["stop-detail"]}>
        <div className={styles["rent-count"]}>
          <GiDutchBike size={24} />
          {sbi}
        </div>
        <div className={styles["park-count"]}>
          <FaParking size={24} />
          {bemp}
        </div>
      </div>
      <div className={styles["updated-time"]}>
        <p>更新時間</p>
        {updateTime}
        <div className={styles["add-btn"]}>
          <AddFavoriteBtn stopsId={id} />
        </div>
      </div>
    </div>
  );
}
export default InfoWindowDesk;
