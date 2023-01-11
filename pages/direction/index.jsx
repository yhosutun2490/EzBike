import Head from "next/head";
import styles from "./DirectionPage.module.scss";
import Map from "../../components/Map";
import { useState, useEffect, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { BikesContext } from "../../context/bikesContext";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import DirectionSearchNavBar from "../../components/DirectionSearchNavBar";

const libraries = ["places"];

function DirectionPage(props) {
  const bikeStopsData = useContext(BikesContext); // 所有Ubike站點資料
  // GPS資料
  const userGPS = useContext(GeoLocationContext).userGPS;
  const departureGPS = useContext(GeoLocationContext).departureGPS;
  const destinationGPS = useContext(GeoLocationContext).destinationGPS;
  // GPS set Function
  const setUserGPS = useContext(GeoLocationContext).setUserGPS;
  const setDepartureGPS = useContext(GeoLocationContext).setDepartureGPS;
  const setDestinationGPS = useContext(GeoLocationContext).setDestinationGPS;

  const [directions, setDirections] = useState(null); //導航方向
  const [travelMethod, setTravelMethod] = useState("bike");
  const [activeMarker, setActiveMarker] = useState(null); // activeMark 視窗狀態用
  const [isModalOpen, setIsModalOpen] = useState(false); // sidebar modal視窗用
  const setBikeStops = bikeStopsData.setAllBikesData; // 所有單車站站點資訊(context 管理)
  const bikeStops = bikeStopsData.allBikesData
    ? bikeStopsData.allBikesData
    : props.allBikesData; //第一次是client端是空資料，用server SSG props

  // 先用javascript CSR載地圖
  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // use Places library
    libraries,
  });

  // 每分鐘重新更新站點資訊
  useEffect(() => {
    const timer = setInterval(async () => {
      const allBikesData = await fetch(
        "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
      )
        .then(function (response) {
          return response.json();
        })
        .catch(function (err) {
          console.log(err);
        });

      setBikeStops(allBikesData);
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [setBikeStops]);

  // Google Direction函式
  function fetchGoogleDirection(travelMethod) {
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
    service.route(
      {
        origin: departureGPS,
        destination: destinationGPS,
        travelMode: `${travelMode}`,
        // 可以選擇轉乘公車或捷運
        transitOptions: {
          modes: [`${defaultMode}`],
          routingPreference: "FEWER_TRANSFERS",
        },
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  }

  console.log(directions);

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
        <div className={styles["nav-bar"]}>
          {!isLoaded ? (
            <p>isLoading...</p>
          ) : (
            <DirectionSearchNavBar
              setSelectedDep={setDepartureGPS}
              setSelectedDest={setDestinationGPS}
              setTravelMethod={setTravelMethod}
              travelMethod={travelMethod}
            />
          )}
        </div>
        {directions && <div></div>}
        <div className={styles["map"]}>
          {!isLoaded ? (
            <p>Loading....</p>
          ) : (
            <Map
              bikesData={bikeStops}
              setSelected={setDepartureGPS}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              isModalOpen={isModalOpen}
              directions={directions}
            />
          )}
        </div>
        <button
          className={styles.navigation_btn}
          onClick={() => fetchGoogleDirection(travelMethod)}
        >
          導航
        </button>
      </main>
    </>
  );
}

// server SSG fetch data
export async function getStaticProps() {
  let allBikesData = await fetch(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
    .then(function (response) {
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    });
  const responseYear = allBikesData[0].infoDate.slice(0, 4);
  // 公共api有時會載到2022舊資料
  if (responseYear === "2022") {
    allBikesData = await fetch(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    )
      .then(function (response) {
        return response.json();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return {
    props: {
      allBikesData: allBikesData,
    },
    revalidate: 60,
  };
}

export default DirectionPage;
