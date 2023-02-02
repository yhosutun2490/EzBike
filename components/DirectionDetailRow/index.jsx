import styles from "./DirectionDetailRow.module.scss";
import BusTransitBox from "./BusTransitBox";
import MetroTransitBox from "./MetroTransitBox";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import { useContext } from "react";
import { Alert, AlertTitle } from "@mui/material";
function DirectionDetailRow(props) {
  const { directions, travelMethod } = props;
  const { departureGPS, destinationGPS } = useContext(GeoLocationContext);
  const fullRouteInput =
    departureGPS === null || destinationGPS === null ? false : true;
  const duration = directions?.routes[0].legs[0].duration.text;
  const distance = directions?.routes[0].legs[0].distance.text;
  let travelMethodText = "";
  // 取出每個交通資訊步驟
  const routesSteps = directions?.routes[0].legs[0].steps;
  // 取出有transit(公車或捷運路線詳細資料)
  const routeData = routesSteps?.filter(
    (data) => data.travel_mode === "TRANSIT"
  );

  switch (travelMethod) {
    case "bike":
      travelMethodText = "騎單車";
      break;
    case "metro":
      if (!routeData?.length) {
        travelMethodText = "無捷運搭乘路線，推薦您步行";
      } else {
        travelMethodText = "搭捷運";
      }
      break;
    case "bus":
      if (!routeData?.length) {
        travelMethodText = "步行多運動就可以囉";
      } else {
        travelMethodText = "搭公車";
      }
      break;
    default:
      console.log(`Sorry, we are out of TravelMode.`);
  }

  return (
    <div className={styles.directions}>
      {!directions && (
        <Alert severity="info">
          <AlertTitle>
            <strong>
              <h3>使用通知</h3>
            </strong>
          </AlertTitle>
          <strong>
            <h4>
              記得輸入您的完整路線，並選取右方導航模式，
              我們會盡量顯示到達站附近Ubike站點，方便您後續利用 —
              旅途愉快，注意路況安全!
            </h4>
          </strong>
        </Alert>
      )}
      {fullRouteInput && (
        <div className={styles.directions_details}>
          <div className={styles.travel_mode}>{travelMethodText}</div>
          {travelMethod === "bus" &&
            routeData?.map((data, index) => (
              <BusTransitBox key={index + "bus"} routeData={data} />
            ))}
          {travelMethod === "metro" &&
            routeData?.map((data, index) => (
              <MetroTransitBox key={index + "metro"} routeData={data} />
            ))}
          {routeData && (
            <div className={styles.duration_info}>
              <p className={styles.duration_time}>時間</p>
              <p>{duration}</p>
            </div>
          )}
          <div>
            {travelMethod === "bike" && (
              <p className={styles.distance_info}>
                <p>總距離</p>
                <p>{distance}</p>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectionDetailRow;
