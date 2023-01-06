import styles from "./Map.module.scss";
import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";

function Map(props) {
  const [activeMarker, setActiveMarker] = useState(null); // activeMark 視窗狀態用
  const { bikesData } = props;
  const center = { lat: 25.04792, lng: 121.51741 }; // 預設中心點
  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    // 如果點到的站點視窗沒打開，更新狀態
    setActiveMarker(markerId);
  };

  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerClassName={styles["map-container"]}
      onClick={() => setActiveMarker(false)}
    >
      <MarkerClusterer>
        {(clusterer) =>
          bikesData.map((item) => (
            <Marker
              key={item.sno}
              position={{ lat: item.lat, lng: item.lng }}
              clusterer={clusterer}
              onClick={() => handleActiveMarker(item.sno)}
            >
              {activeMarker === item.sno ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className={styles["info-window"]}>
                    <div>
                      <span className={styles["info-title"]}>站點名:</span>
                      <span className={styles["info-content"]}>{item.ar}</span>
                    </div>
                    <div>
                      <span className={styles["info-title"]}>地址:</span>
                      <span className={styles["info-content"]}>
                        {item.aren}
                      </span>
                    </div>
                    <div>
                      <span className={styles["info-title"]}>可租車輛:</span>
                      <span className={styles["info-content"]}>{item.sbi}</span>
                    </div>
                    <div>
                      <span className={styles["info-title"]}>停車位:</span>
                      <span className={styles["info-content"]}>
                        {item.bemp}
                      </span>
                    </div>
                    <div>
                      <span className={styles["info-title"]}>更新時間:</span>
                      <span className={styles["info-content"]}>
                        {item.updateTime}
                      </span>
                    </div>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))
        }
      </MarkerClusterer>
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Map;
