import InputSearch from "./InputSearch";
import styles from "./SearchNavBar.module.scss";
import BarThreeIcon from "../../public/images/bar-three-icon";
import GearIcon from "../../public/images/gear-icon";
function SearchNavBar() {
  return (
    <header className={styles["header"]}>
      <nav className={styles["nav"]}>
        <div className={styles["icon"]}>
          <BarThreeIcon />
        </div>
        <div className={styles["icon"]}>
          <GearIcon />
        </div>
      </nav>
      <InputSearch />
    </header>
  );
}
export default SearchNavBar;
