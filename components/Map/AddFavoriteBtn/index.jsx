import styles from "./AddFavoriteBtn.module.scss";
import { useContext } from "react";
import { BikesContext } from "../../../context/BikesContext";
import { toast } from "react-toastify";

function AddFavoriteBtn(props) {
  const { stopsId } = props;
  const setFavoriteStop = useContext(BikesContext).setUserFavoriteStops;
  const userFavoriteStops = useContext(BikesContext).userFavoriteStops;
  const newFavoriteIdAarr = Array.from(userFavoriteStops);
  const isStopLiked = checkStopIsLiked();

  // 比對是否已經存在最愛清單裡
  function checkStopIsLiked() {
    let checkIsLiked = false;
    if (userFavoriteStops.length !== 0) {
      const results = userFavoriteStops?.find((id) => id === stopsId);
      if (results) {
        checkIsLiked = true;
      } else {
        checkIsLiked = false;
      }
    }

    return checkIsLiked;
  }

  function handleAddFavorite(e) {
    const stopId = e.target.dataset.id; //單車站id號碼
    newFavoriteIdAarr.push(stopId);
    localStorage.setItem("favoriteStopsId", JSON.stringify(newFavoriteIdAarr));
    setFavoriteStop(newFavoriteIdAarr);
    toast("已加入最愛!");
  }

  function handleDeleteFavorite(e) {
    const stopId = e.target.dataset.id; //單車站id號碼
    const resultArr = newFavoriteIdAarr.filter((id) => id !== stopId);
    localStorage.setItem("favoriteStopsId", JSON.stringify(resultArr));
    setFavoriteStop(resultArr);
    toast("已取消最愛!");
  }
  return (
    <>
      {isStopLiked ? (
        <button
          className={styles.delete_btn}
          data-id={stopsId}
          onClick={(e) => handleDeleteFavorite(e)}
        >
          取消最愛
        </button>
      ) : (
        <button
          className={styles.favorite_btn}
          data-id={stopsId}
          onClick={(e) => handleAddFavorite(e)}
        >
          加入最愛
        </button>
      )}
    </>
  );
}

export default AddFavoriteBtn;
