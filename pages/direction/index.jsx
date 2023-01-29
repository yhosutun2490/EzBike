import Head from "next/head";
import styles from "./DirectionPage.module.scss";
import "default-passive-events"; //瀏覽器套件
import ubikeApi from "../api/ubikeApi";
import Map from "../../components/Map";
import { useState, useEffect, useContext, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { BikesContext } from "../../context/BikesContext";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import DirectionSearchNavBar from "../../components/DirectionSearchNavBar";
import DirectionDetailRow from "../../components/DirectionDetailRow";
import distanceCaculator from "../../utils/distanceCaulator"; // 測量兩點直線距離

const libraries = ["places"];

// 使用者呼叫導航後，只出現周圍0.5公里站點
function filterStopsInCircle(bikeStopsData, depGps, destGps) {
  if (depGps === null || destGps === null) {
    return;
  }
  const inCircleStops = bikeStopsData.filter((data) => {
    const distanceDepStops = distanceCaculator(
      data.lat,
      data.lng,
      depGps.lat,
      depGps.lng,
      "K"
    );
    const distanceDestStops = distanceCaculator(
      data.lat,
      data.lng,
      destGps.lat,
      destGps.lng,
      "K"
    );
    return distanceDepStops <= 0.7 || distanceDestStops <= 0.7;
  });
  return inCircleStops;
}

function DirectionPage(props) {
  const { allBikesData, setAllBikesData } = useContext(BikesContext);
  const { departureGPS, destinationGPS, setDepartureGPS, setDestinationGPS } =
    useContext(GeoLocationContext);

  const [directions, setDirections] = useState(null); //導航方向
  const [travelMethod, setTravelMethod] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null); // activeMark 視窗狀態用
  const [isModalOpen, setIsModalOpen] = useState(false); // sidebar modal視窗用

  // 先用javascript CSR載地圖
  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // use Places library
    libraries,
  });

  // Google Direction函式
  async function fetchGoogleDirection(travelMethod) {
    let travelMode = "";
    let defaultMode = "SUBWAY";
    // 交通方式
    if (travelMethod === "bus") {
      travelMode = "TRANSIT";
      defaultMode = "BUS";
    } else if (travelMethod === "metro") {
      travelMode = "TRANSIT";
    } else if (travelMethod === "bike") {
      travelMode = "BICYCLING";
    }
    if (!departureGPS) {
      // 如果沒有出發點直接return不作事
      return;
    }
    const service = new google.maps.DirectionsService();
    await service.route(
      {
        origin: departureGPS,
        destination: destinationGPS,
        travelMode: `${travelMode}`,
        // 可以選擇轉乘公車或捷運
        transitOptions: {
          modes: [`${defaultMode}`],
          // routingPreference: "FEWER_TRANSFERS",
        },
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error(error);
        }
      }
    );
  }

  // 按下導航時篩選範圍內站點
  let inCircleStops = [];
  if (directions) {
    inCircleStops = filterStopsInCircle(
      allBikesData,
      departureGPS,
      destinationGPS
    );
  }

  // directions導航結果
  console.log(directions);

  // 每分鐘重新更新站點資訊，第一次渲染也由CSR去fetch資料
  useEffect(() => {
    async function fetchUbikeData() {
      const bikeStopsData = await ubikeApi();
      setAllBikesData(bikeStopsData);
    }
    fetchUbikeData();
    // 60秒後更新資料
    const timer = setInterval(() => {
      fetchUbikeData();
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [setAllBikesData]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="EzBike Navigation for Taipei Ubike Users"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.nav_bar}>
          {!isLoaded ? (
            <p>isLoading...</p>
          ) : (
            <DirectionSearchNavBar
              setSelectedDep={setDepartureGPS}
              setSelectedDest={setDestinationGPS}
              setTravelMethod={setTravelMethod}
              travelMethod={travelMethod}
              fetchGoogleDirection={fetchGoogleDirection}
              setDirections={setDirections}
            />
          )}
          {directions && (
            <DirectionDetailRow
              directions={directions}
              travelMethod={travelMethod}
            />
          )}
        </div>
        <div className={styles.map_container}>
          <div className={styles.map}>
            {!isLoaded ? (
              <p>Loading....</p>
            ) : (
              <Map
                bikesData={inCircleStops}
                setSelected={setDepartureGPS}
                activeMarker={activeMarker}
                setActiveMarker={setActiveMarker}
                isModalOpen={isModalOpen}
                directions={directions}
                departureGPS={departureGPS}
                destinationGPS={destinationGPS}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

// server SSG fetch data
// export async function getStaticProps() {
//   let allBikesData = await ubikeApi();
//   return {
//     props: {
//       allBikesData: allBikesData,
//     },
//     revalidate: 60,
//   };
// }

export default DirectionPage;
