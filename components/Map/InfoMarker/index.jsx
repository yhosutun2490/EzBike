import styles from "./InfoMarker.module.scss";
import { GiDutchBike } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import AddFavoriteBtn from "../AddFavoriteBtn";

function InfoMarker(props) {
  const { id, ar, aren, sbi, bemp, updateTime } = props;
  // 界車禍停車數量小於5時，變換警示顏色
  const rentCountStyle = Number(sbi) <= 3 ? "alert" : "";
  const parkCountStyle = Number(bemp) <= 3 ? "alert" : "";
  return (
    <div className={styles["info-window-main"]}>
      <div className={styles["bike-main-info"]}>
        <span className={styles["rent-count"]}>
          <GiDutchBike size={28} />
          <div className={styles[`${rentCountStyle}`]}>可借: {sbi}</div>
        </span>
        <span className={styles["park-count"]}>
          <FaParking size={28} />
          <div className={styles[`${parkCountStyle}`]}>可停: {bemp}</div>
        </span>
        <div className={styles["add-btn"]}>
          <AddFavoriteBtn stopsId={id} />
        </div>
      </div>
      <div className={styles["bike-sub-info"]}>
        <div className={styles["bike-name"]}>
          <span className={styles["info-title"]}>站點名:</span>
          <span className={styles["info-content"]}>{ar}</span>
        </div>
        <div className={styles["bike-address"]}>
          <span className={styles["info-title"]}>地址:</span>
          <span className={styles["info-content"]}>{aren}</span>
        </div>

        <div className={styles["bike-updated"]}>
          <span className={styles["info-title"]}>更新時間:</span>
          <span className={styles["info-content"]}>{updateTime}</span>
        </div>
      </div>
    </div>
  );
}

export default InfoMarker;
