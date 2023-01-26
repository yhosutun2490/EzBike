import styles from "./Map.module.scss";
import InfoMarker from "./InfoMarker"; // 手機版站點資訊使用
import InfoWindowDesk from "./InfoWindowDesk"; // 桌機版站點資訊使用
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import { useContext } from "react";

const defaultCircleOption = {
  strokeColor: "blue",
  strokeWeight: 1,
  zIndex: -1,
  fillOpacity: 0.2,
  fillColor: "grey",
};
const userHoverCircleOption = {
  strokeColor: "#E16D65",
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: "#E16D65",
  fillOpacity: 0,
};

function Map(props) {
  const {
    bikesData,
    centerPosition,
    activeMarker,
    setActiveMarker,
    isModalOpen,
    directions,
  } = props;
  const { userGPS, departureGPS, destinationGPS } =
    useContext(GeoLocationContext); //使用者自己的定位
  const defaultCenter = { lat: 25.04948010031126, lng: 121.53874337838153 }; // 預設中心點
  // const center = userGPS !== null ? userGPS : defaultCenter;
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

  // 站點中心點比對function
  function checkCenterGeoLocation(lat, lng) {
    if (centerPosition) {
      if (centerPosition.lat === lat && centerPosition.lng === lng) {
        return true;
      } else {
        return false;
      }
    }
  }
  return (
    <GoogleMap
      zoom={17}
      center={centerPosition ? centerPosition : defaultCenter}
      mapContainerClassName={styles["map-container"]}
      onClick={() => setActiveMarker(false)}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#1976D2", // 路線顏色
              strokeWeight: 5,
            },
          }}
        />
      )}
      <MarkerClusterer>
        {(clusterer) =>
          bikesData &&
          bikesData?.map((item) => {
            const isTarget = checkCenterGeoLocation(item.lat, item.lng);
            return (
              <Marker
                key={item.sno}
                position={{ lat: item.lat, lng: item.lng }}
                clusterer={clusterer}
                animation={2}
                icon={
                  isTarget
                    ? {
                        url: "https://cdn-icons-png.flaticon.com/512/8340/8340715.png",
                        scaledSize: { width: 36, height: 36 },
                      }
                    : item.sbi <= 3
                    ? {
                        url: "/images/no-rent-bike.svg",
                        scaledSize: { width: 36, height: 36 },
                      }
                    : item.bemp <= 3
                    ? {
                        url: "/images/no-park-site.png",
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
                {activeMarker === item.sno && !isModalOpen ? (
                  <div className={styles["info-window-mobile"]}>
                    <InfoMarker
                      id={item.sno}
                      ar={item.ar}
                      aren={item.aren}
                      sbi={item.sbi}
                      bemp={item.bemp}
                      updateTime={item.updateTime}
                      lat={item.lat}
                      lng={item.lng}
                    />
                  </div>
                ) : null}
                {activeMarker === item.sno && !isModalOpen ? (
                  <InfoWindow
                    onCloseClick={() => setActiveMarker(null)}
                    className={styles["info-window-desk"]}
                  >
                    <InfoWindowDesk
                      id={item.sno}
                      ar={item.ar}
                      aren={item.aren}
                      sbi={item.sbi}
                      bemp={item.bemp}
                      updateTime={item.updateTime}
                      lat={item.lat}
                      lng={item.lng}
                    />
                  </InfoWindow>
                ) : null}
              </Marker>
            );
          })
        }
      </MarkerClusterer>
      <Marker
        position={centerPosition ? centerPosition : defaultCenter}
        icon={{
          // path: google.maps.SymbolPath.CIRCLE,
          url: "https://cdn-icons-png.flaticon.com/512/8340/8340715.png",
          scaledSize: { width: 40, height: 40 },
        }}
        zIndex={-5}
      />
      {/* <Circle
        center={centerPosition ? centerPosition : defaultCenter}
        radius={50}
        options={userHoverCircleOption}
        onLoad={(event) => {
          let direction = 1;
          const rMin = 100;
          const rMax = 300;
          setInterval(function () {
            const radius = event.getRadius();
            if (radius > rMax || radius < rMin) {
              direction *= -1;
            }
            event.setRadius(radius + direction * 10);
          }, 1000);
        }}
      /> */}
      {directions && (
        <Circle
          center={departureGPS}
          radius={700}
          options={defaultCircleOption}
        />
      )}
      {directions && (
        <Circle
          center={destinationGPS}
          radius={700}
          options={defaultCircleOption}
        />
      )}
      {userGPS && (
        <Circle center={userGPS} radius={300} options={defaultCircleOption} />
      )}
    </GoogleMap>
  );
}

export default Map;
