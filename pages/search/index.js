import SearchNavBar from "../../components/SearchNavBar"
import styles from "./Search.module.scss"
import {
  useLoadScript,
  GoogleMap,
  Marker
} from "@react-google-maps/api";

function SearchPage () {
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
      {!isLoaded ? <p>Loading....</p> : <Map/>}
    </div>
  </div>
  )

}

function Map () {
  return (
     <GoogleMap 
     zoom={15} 
     center={{lat:25.04792,lng:121.51741}} 
     mapContainerClassName={styles["map-container"]}>
  </GoogleMap>
  )
 
}
export default SearchPage