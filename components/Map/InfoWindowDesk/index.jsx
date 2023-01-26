import styles from "./InfoWindowDesk.module.scss";
import { GiDutchBike } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import AddFavoriteBtn from "../AddFavoriteBtn";
import AddNavigationBtn from "../AddNavigationBtn";

function InfoWindowDesk(props) {
  const { id, ar, aren, sbi, bemp, updateTime, lat, lng } = props;
  return (
    <div className={styles["info-window"]}>
      <div className={styles["stop-name-group"]}>
        <p className={styles["title"]}>站點名:</p>
        <p className={styles["content"]}>{ar}</p>
      </div>
      <div className={styles["stop-address-group"]}>
        <p className={styles["title"]}>地址:</p>
        <p className={styles["content"]}>{aren}</p>
      </div>
      <div className={styles["stop-detail-group"]}>
        <div className={styles["rent-count"]}>
          <GiDutchBike size={28} />
          <p className={styles["content"]}>{sbi}</p>
        </div>
        <div className={styles["park-count"]}>
          <FaParking size={28} />
          <p className={styles["content"]}>{bemp}</p>
        </div>
      </div>
      <div className={styles["updated-time-group"]}>
        <p className={styles["title"]}>更新時間:</p>
        <p className={styles["content"]}>{updateTime}</p>

        <div className={styles["add-btn"]}>
          <AddFavoriteBtn stopsId={id} />
        </div>
        <div className={styles["add-navigation-btn"]}>
          <AddNavigationBtn lat={lat} lng={lng} />
        </div>
      </div>
    </div>
  );
}
export default InfoWindowDesk;
