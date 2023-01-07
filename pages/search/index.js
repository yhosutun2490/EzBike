// import SearchNavBar from "../../components/SearchNavBar"
import styles from "./Search.module.scss"
import Map from "../../components/Map";
import usePlacesAutocomplete, {getGeocode,getLatLng} from "use-places-autocomplete"
import {Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption} from "@reach/combobox"
import "@reach/combobox/styles.css"
import {useState} from "react"
import {
  useLoadScript,
} from "@react-google-maps/api";

function SearchPage (props) {
  const [selected, setSelected] = useState(null)
  // ubike 資訊
   const allBikesData = props.allBikesData
  // 先用javascript CSR載地圖
   const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // use Places library
    libraries: ["places"]

  });

  return (
  <div className={styles["main"]}>
    <div className={styles["nav-bar"]}>
       {!isLoaded? <p>Loading....</p> : <PlacesAutocomplete setSelected={setSelected}/> }
    </div>
    <div className={styles["map"]}>
      {!isLoaded ? <p>Loading....</p> : <Map bikesData={allBikesData} position={selected}  setSelected={setSelected}/>}
    </div>
  </div>
  )
}

// AutoCompelete 元件
function PlacesAutocomplete ({setSelected}) {
  const {ready,value,setValue,suggestions:{status,data},clearSuggestions} = usePlacesAutocomplete()

  // 被選到的地址需要轉換
  async function handleSelected (address) {
    setValue(address,false) // 設定false 不fetch data
    clearSuggestions() // 清掉下拉預設選項
    const results = await getGeocode({address})
    const {lat, lng} = await getLatLng(results[0])
    setSelected({lat, lng})


  }
  return <Combobox onSelect={handleSelected}>
    <ComboboxInput value={value} onChange={(e)=>{setValue(e.target.value)}} disable={!ready} placeholder="請輸入搜尋地址" className={styles['combobox-input']}/>
    <ComboboxPopover>
      <ComboboxList>
        {status=== 'OK' && data.map(({place_id,description}) => <ComboboxOption key={place_id} value={description}/>)}
      </ComboboxList>
    </ComboboxPopover>
  </Combobox>

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