import styles from "./Map.module.scss";
import { useState } from "react";
import InfoMarker from "./InfoMarker";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";

function Map(props) {
  const [activeMarker, setActiveMarker] = useState(null); // activeMark 視窗狀態用
  const { bikesData, position, setSelected } = props;
  const center = { lat: 25.04792, lng: 121.51741 }; // 預設中心點
  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    // 如果點到的站點視窗沒打開，更新狀態
    setActiveMarker(markerId);
  };
  // 站點marker 圖示
  let markerIconUrl =
    "https://icon-library.com/images/cycling-icon-png/cycling-icon-png-15.jpg";
  return (
    <GoogleMap
      zoom={18}
      center={position ? position : center}
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
              animation={2}
              icon={
                item.sbi <= 3
                  ? {
                      url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Symbole_AMP_V%C3%A9lo.svg",
                      scaledSize: { width: 36, height: 36 },
                    }
                  : item.bemp <= 3
                  ? {
                      url: "https://cdn-icons-png.flaticon.com/512/9050/9050693.png",
                      scaledSize: { width: 50, height: 50 },
                    }
                  : {
                      url: markerIconUrl,
                      scaledSize: { width: 36, height: 36 },
                    }
              }
              onClick={() => {
                handleActiveMarker(item.sno);
              }}
            >
              {activeMarker === item.sno ? (
                <div className={styles["info-window"]}>
                  <InfoMarker
                    ar={item.ar}
                    aren={item.aren}
                    sbi={item.sbi}
                    bemp={item.bemp}
                    updateTime={item.updateTime}
                  />
                </div>
              ) : null}
            </Marker>
          ))
        }
      </MarkerClusterer>
      <Marker
        position={position ? position : center}
        icon={{
          // path: google.maps.SymbolPath.CIRCLE,
          url: "https://cdn-icons-png.flaticon.com/512/8340/8340715.png",
          scaledSize: { width: 40, height: 40 },
        }}
      />
    </GoogleMap>
  );
}

export default Map;
