import Head from "next/head";
import styles from "./DirectionPage.module.scss";
import Map from "../../components/Map";
import { useState, useEffect, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { BikesContext } from "../../context/bikesContext";
import DirectionSearchNavBar from "../../components/DirectionSearchNavBar";

const libraries = ["places"];

function DirectionPage(props) {
  const bikeStopsData = useContext(BikesContext);
  const [selectedDep, setSelectedDep] = useState(null); // 出發地GPS
  const [selectedDest, setSelectedDest] = useState(null); // 目的地GPS
  const [directions, setDirections] = useState(null); //導航方向
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
  function fetchGoogleDirection() {
    // 如果沒有出發點直接return不作事
    if (!selectedDep) {
      return;
    }

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: selectedDep,
        destination: selectedDest,
        travelMode: "TRANSIT",
        // 可以選擇轉乘公車或捷運
        transitOptions: {
          modes: ["SUBWAY"],
          routingPreference: "FEWER_TRANSFERS",
        },
      },
      (result, status) => {
        if (status === "OK" && result) {
          console.log(result);
          setDirections(result);
        }
      }
    );
  }
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
              setSelectedDep={setSelectedDep}
              setSelectedDest={setSelectedDest}
            />
          )}
        </div>
        {directions && <div>搭公車</div>}
        <div className={styles["map"]}>
          {!isLoaded ? (
            <p>Loading....</p>
          ) : (
            <Map
              bikesData={bikeStops}
              setSelected={setSelectedDep}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              isModalOpen={isModalOpen}
              directions={directions}
            />
          )}
        </div>
        <button
          className={styles.navigation_btn}
          onClick={fetchGoogleDirection}
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
