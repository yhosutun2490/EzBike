import styles from "./PlacesAutoComplete.module.scss";
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

function PlacesAutoComplete(props) {
  const { setSelected, setTravelMethod, setDirections } = props;
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // 被選到的地址需要轉換
  async function handleSelected(address) {
    setValue(address, false); // 設定false 不fetch data
    clearSuggestions(); // 清掉下拉預設選項
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  }
  // 使用者再次點擊輸入框時
  function handleOnFucus() {
    setTravelMethod(null);
    setDirections(null);
  }

  return (
    <Combobox
      onSelect={handleSelected}
      className={styles["combobox-box"]}
      onFocus={handleOnFucus}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disable={!ready}
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
