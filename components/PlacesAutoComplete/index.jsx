import styles from "./PlacesAutoComplete.module.scss";
import { useRouter } from "next/router";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GeoLocationContext } from "../../context/GeoLocationContext";
import { useContext, useEffect } from "react";

function PlacesAutoComplete(props) {
  const { setSelected, setTravelMethod, setDirections, dataId, defaultValue } =
    props;
  const { setDepartureGPS, setDestinationGPS } = useContext(GeoLocationContext);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const route = useRouter();

  // 被選到的地址需要轉換
  async function handleSelected(address) {
    setValue(address, false); // 設定false 不fetch data
    clearSuggestions(); // 清掉下拉預設選項
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  }
  // 使用者再次點擊輸入框時
  function handleOnFucus(e) {
    const locationInputName = e.target.parentNode.dataset.id;
    const routeName = route.pathname.slice(1);
    if (routeName !== "direction ") {
      return;
    }
    if (locationInputName === "departure") {
      setDepartureGPS(null);
    } else if (locationInputName === "destination") {
      setDestinationGPS(null);
    }
    setTravelMethod(null);
    setDirections(null);
  }
  // AutoCompelteInput帶入預設值
  useEffect(() => {
    function handleDefaultValue() {
      defaultValue === null ? setValue("") : setValue(defaultValue, false);
    }
    handleDefaultValue();
  }, [defaultValue, setValue]);

  return (
    <Combobox
      onSelect={handleSelected}
      className={styles["combobox-box"]}
      onFocus={(e) => handleOnFucus(e)}
      data-id={dataId}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disable={!ready ? "false" : "true"}
        placeholder="請輸入搜尋地址"
        className={styles["combobox-input"]}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default PlacesAutoComplete;
