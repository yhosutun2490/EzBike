import PlacesAutoComplete from "../PlacesAutocomplete";
import styles from "./SearchNavBar.module.scss";
import { FaBars } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
function SearchNavBar(props) {
  const { setSelected } = props;
  return (
    <header className={styles["header"]}>
      <nav className={styles["nav"]}>
        <div className={`${styles.icon} ${styles.icon_hamburger}`}>
          <FaBars size={32} />
        </div>
        <div className={styles.input}>
          <PlacesAutoComplete setSelected={setSelected} />
        </div>
        <div className={`${styles.icon} ${styles.icon_love_list}`}>
          <CgUserList size={32} />
        </div>
        <div className={`${styles.icon} ${styles.icon_setting}`}>
          <BsGear size={32} />
        </div>
      </nav>
    </header>
  );
}
export default SearchNavBar;
