import styles from "./InputSearch.module.scss";
import SearchIcon from "../../../public/images/search-icon";
import { useState } from "react";
function InputSearch() {
  const [input, setInput] = useState("");
  function onSubmit() {
    console.log(input);
  }
  return (
    <div className={styles["search"]}>
      <input
        type="text"
        className={styles["input"]}
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Enter your location"
      />
      <div className={styles["icon"]} onClick={onSubmit}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default InputSearch;
