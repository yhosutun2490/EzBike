import styles from "./FavoriteStopsModal.module.scss";
import { useContext } from "react";
import { BikesContext } from "../../context/bikesContext";
function FavoriteStopsModal(props) {
  const { setIsFavoriteOpen, bikeStops } = props;
  const favoriteStops = useContext(BikesContext).userFavoriteStops;
  const transArray = Object.values(bikeStops); //物件轉陣列
  console.log(favoriteStops);

  // 將最愛站點的id比對所有站點資料
  let filterStops = [];
  if (!favoriteStops.length) {
    return;
  } else {
    filterStops = transArray.filter((stop) => favoriteStops.includes(stop.sno));
    console.log(filterStops);
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
                <p>站點名稱</p>
                {item.ar}
              </div>
              <div className={styles.bikes_info}>
                <div className={styles.rent_count}>
                  <p>租車數量</p>
                  {item.sbi}
                </div>
                <div className={styles.park_count}>
                  <p>停車位</p>
                  {item.bemp}
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
