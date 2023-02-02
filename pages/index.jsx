import Head from "next/head";
import styles from "./Home.module.scss";
import ubikeApi from "./api/ubikeApi";
import MemoMap from "../components/Map";
import SearchNavBar from "../components/SearchNavBar";
import StopStatusRow from "../components/StopStatusRow";
import UserGeoLocationBtn from "../components/UserGeoLocationBtn";
import Footer from "../components/Footer";
import { useState, useEffect, useContext, useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { BikesContext } from "../context/BikesContext";
import FavoriteStopCard from "../components/FovariteStopCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";

const libraries = ["places"];

export default function Home(props) {
  const [selected, setSelected] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null); // activeMark 視窗狀態用
  const [isModalOpen, setIsModalOpen] = useState(false); // sidebar modal視窗用
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false); // 最愛站點清單
  const { setUserFavoriteStops, userFavoriteStops } = useContext(BikesContext); //使用者最愛站點資料

  // 先用javascript CSR載地圖
  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // use Places library
    libraries,
  });
  // useQuery重構
  const { data } = useQuery("ubikeAPI", ubikeApi, {
    refetchOnWindowFocus: false,
    refetchInterval: 60000, // 每分鐘fetch資料更新一次
  });
  // 過濾最愛站點
  const filterStops = data?.filter((stop) =>
    userFavoriteStops.includes(stop.sno)
  );

  useEffect(() => {
    const favoriteStopsId = JSON.parse(localStorage.getItem("favoriteStopsId"));
    // 如果取到的不是null (使用者有最愛站點紀錄)
    if (favoriteStopsId) {
      setUserFavoriteStops(favoriteStopsId);
    }
  }, [setUserFavoriteStops]);

  // hover到最愛站點聚焦功能，將摸到的最愛站點gps以setSelected更新
  function onMouseEnter(e) {
    e.stopPropagation();
    console.log(e);
    const stopLat = Number(e.target.dataset.lat);
    const stopLng = Number(e.target.dataset.lng);
    console.log(stopLat, stopLng);
    setSelected({ lat: stopLat, lng: stopLng });
  }

  return (
    <>
      <Head>
        <title>EzBike單車網頁App</title>
        <meta
          name="description"
          content="EzBike App for Taipei Ubike Users Search Ubikes Stops"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body_container}>
        <div className={styles["nav-bar"]}>
          {!isLoaded ? (
            <p>Loading....</p>
          ) : (
            <SearchNavBar
              setSelected={setSelected}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              setIsFavoriteOpen={setIsFavoriteOpen}
              isFavoriteOpen={isFavoriteOpen}
              bikeStops={data}
              onMouseEnter={onMouseEnter}
            />
          )}
        </div>
        <StopStatusRow />
        <main className={styles.main}>
          <ToastContainer
            className={styles.toast_container}
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className={styles.favorite_stops_list}>
            {filterStops?.length > 0 && (
              <div className={styles.favorite_title}>最愛站點清單</div>
            )}
            {filterStops?.map((item) => (
              <FavoriteStopCard
                key={item.sno}
                stopName={item.ar}
                rentCount={item.sbi}
                parkCount={item.bemp}
                stopId={item.sno}
                lat={item.lat}
                lng={item.lng}
                onMouseEnter={onMouseEnter}
              />
            ))}
          </div>
          <div className={styles.map}>
            {!isLoaded ? (
              <p>Loading....</p>
            ) : (
              <MemoMap
                bikesData={data}
                centerPosition={selected}
                setSelected={setSelected}
                activeMarker={activeMarker}
                setActiveMarker={setActiveMarker}
              />
            )}
            <div className={styles.geolocation_btn_wrap}>
              <UserGeoLocationBtn setSelected={setSelected} />
            </div>
          </div>
        </main>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
}
