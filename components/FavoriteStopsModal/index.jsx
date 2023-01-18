import styles from "./FavoriteStopsModal.module.scss";
import { useContext } from "react";
import { BikesContext } from "../../context/BikesContext";
import FavoriteStopCard from "../FovariteStopCard";
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
            <FavoriteStopCard
              key={item.sno}
              stopName={item.ar}
              rentCount={item.sbi}
              parkCount={item.bemp}
              stopId={item.sno}
              lat={item.lat}
              lng={item.lng}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default FavoriteStopsModal;
