import styles from "./AddFavoriteBtn.module.scss";
import { useContext } from "react";
import { BikesContext } from "../../../context/BikesContext";
import { toast } from "react-toastify";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { orange, cyan } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    cancelLove: {
      light: "#757ce8",
      main: orange[800],
      dark: orange[500],
      contrastText: "#fff",
    },
  },
});

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
      <ThemeProvider theme={theme}>
        {isStopLiked ? (
          <Button
            variant="contained"
            color="cancelLove"
            data-id={stopsId}
            onClick={(e) => handleDeleteFavorite(e)}
            style={{ borderRadius: 10, fontSize: 16 }}
          >
            取消最愛
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            data-id={stopsId}
            onClick={(e) => handleAddFavorite(e)}
            style={{ borderRadius: 10, fontSize: 16 }}
          >
            加入最愛
          </Button>
        )}
      </ThemeProvider>
    </>
  );
}

export default AddFavoriteBtn;
