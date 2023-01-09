import PlacesAutoComplete from "../PlacesAutocomplete";
import styles from "./SearchNavBar.module.scss";
import { FaBars } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import HamburgerModal from "../HamburgerModal";
function SearchNavBar(props) {
  const { setSelected, isModalOpen, setIsModalOpen } = props;

  return (
    <header className={styles["header"]}>
      <nav className={styles["nav"]}>
        <div
          className={`${styles.icon} ${styles.icon_hamburger}`}
          onClick={() => setIsModalOpen(true)}
        >
          <FaBars size={32} />
        </div>
        {isModalOpen && <HamburgerModal setIsModalOpen={setIsModalOpen} />}
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
      <div className={styles.introduction}>
        <div className={`${styles.intro_content} ${styles.normal}`}>
          <img
            src="https://icon-library.com/images/cycling-icon-png/cycling-icon-png-15.jpg"
            alt="normal-bike"
            className={styles.image}
          />
          <p className={styles.intro_note}>正常租借</p>
        </div>
        <div className={`${styles.intro_content} ${styles.rent}`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Symbole_AMP_V%C3%A9lo.svg"
            alt="normal-bike"
            className={styles.image}
          />
          <p className={styles.intro_note}>租借數量不足</p>
        </div>
        <div className={`${styles.intro_content} ${styles.park}`}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/9050/9050693.png"
            alt="normal-bike"
            className={styles.image}
          />
          <p className={styles.intro_note}>停車位不足</p>
        </div>
      </div>
    </header>
  );
}
export default SearchNavBar;
