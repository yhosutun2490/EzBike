import styles from "./FavoriteStopsModal.module.scss";
import { GiDutchBike } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import { useContext } from "react";
import { BikesContext } from "../../context/bikesContext";
function FavoriteStopsModal(props) {
  const { setIsFavoriteOpen, bikeStops } = props;
  const favoriteStops = useContext(BikesContext).userFavoriteStops;
  const transArray = Object.values(bikeStops); //物件轉陣列

  // 將最愛站點的id比對所有站點資料
  let filterStops = [];
  if (!favoriteStops.length) {
    return;
  } else {
    filterStops = transArray.filter((stop) => favoriteStops.includes(stop.sno));
  }

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => {
          setIsFavoriteOpen(false);
        }}
      ></div>
      <div className={styles.main_modal}>
        <div className={styles.page_cluster}>
          {filterStops.map((item) => (
            <div key={item.sno} className={styles.stop_card}>
              <div className={styles.stop_name}>
                <p className={styles.stop_title}>站點名稱</p>
                <div className={styles.stop_name_detail}>{item.ar}</div>
              </div>
              <div className={styles.bikes_info}>
                <div className={styles.rent_count}>
                  <GiDutchBike size={24} />
                  <div className={styles.count_number}>{item.sbi}</div>
                </div>
                <div className={styles.park_count}>
                  <FaParking size={24} />
                  <div className={styles.count_number}>{item.bemp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FavoriteStopsModal;
