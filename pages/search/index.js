import SearchNavBar from "../../components/SearchNavBar"
import styles from "./Search.module.scss"
import Map from "../../components/Map";
import {useState} from "react"
import {
  useLoadScript,
} from "@react-google-maps/api";

function SearchPage (props) {
  // ubike 資訊
   const allBikesData = props.allBikesData
  // 先用javascript CSR載地圖
   const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  return (
  <div className={styles["main"]}>
    <div className={styles["nav-bar"]}>
       <SearchNavBar/>
    </div>
    <div className={styles["map"]}>
      {!isLoaded ? <p>Loading....</p> : <Map bikesData={allBikesData}/>}
    </div>
  </div>
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

export default SearchPage