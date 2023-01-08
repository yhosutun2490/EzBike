import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Map from '../components/Map';
import SearchNavBar from "../components/SearchNavBar";
import {useState,useEffect} from "react"
import {
  useLoadScript,
} from "@react-google-maps/api";


export default function Home(props) {
  const [selected, setSelected] = useState(null)
  const [bikeStops,setBikeStops] = useState(props.allBikesData)  // ubike 資訊
  const [activeMarker, setActiveMarker] = useState(null); // activeMark 視窗狀態用
  const [isModalOpen, setIsModalOpen] = useState(false); // sidebar modal視窗用

  // 先用javascript CSR載地圖
   const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // use Places library
    libraries: ["places"]

  });
  // 每分鐘重新更新站點資訊
   useEffect(() => {
    const timer = setInterval(async () => {
      const allBikesData =  await fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
      .then(function(response) {
        return response.json();
      })
      .catch(function(err) {
    console.log(err);
  });
 
      setBikeStops(allBikesData);
    }, 60000);
 
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="EzBike App for Taipei Ubike Users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles["nav-bar"]}>
       {!isLoaded? <p>Loading....</p> : <SearchNavBar setSelected={setSelected} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> }
    </div>
    <div className={styles["map"]}>
      {!isLoaded ? <p>Loading....</p> : <Map bikesData={bikeStops} position={selected}  setSelected={setSelected} activeMarker={activeMarker} setActiveMarker={setActiveMarker} isModalOpen={isModalOpen} />}
    </div>     
      </main>
    </>
  )
}

// server SSG fetch data
export async function getStaticProps () {
  const allBikesData=  await fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
  .then(function(response) {
    return response.json();
  })
  .catch(function(err) {
    console.log(err);
  });
  return {
    props: {
      allBikesData: allBikesData
    },
    revalidate: 60
  } 
}

