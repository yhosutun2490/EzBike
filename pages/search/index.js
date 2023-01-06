import SearchNavBar from "../../components/SearchNavBar"
import styles from "./Search.module.scss"
import {
  useLoadScript,
  GoogleMap,
  Marker,
 MarkerClusterer
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
    <div>
       <SearchNavBar/>
    </div>
    <div className={styles["map"]}>
      {!isLoaded ? <p>Loading....</p> : <Map bikesData={allBikesData}/>}
    </div>
  </div>
  )

}

function Map (props) {
  const {bikesData} = props
  const center = {lat:25.04792,lng:121.51741}

  return (
     <GoogleMap 
     zoom={16} 
     center={center } 
     mapContainerClassName={styles["map-container"]}>
      <MarkerClusterer>
        {(clusterer) => bikesData.map( item=> <Marker key={item.sno}position={{lat:item.lat,lng:item.lng}} clusterer={clusterer}/>) }
      </MarkerClusterer>
      <Marker position={center}/>
  </GoogleMap>
  )
 
}
// sever SSG fetch data
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
    }
  } 
}

export default SearchPage