import PlacesAutoComplete from "../PlacesAutocomplete";
import styles from "./SearchNavBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import HamburgerModal from "../HamburgerModal";
import FavoriteStopsModal from "../FavoriteStopsModal";

function SearchNavBar(props) {
  const {
    setSelected,
    isModalOpen,
    setIsModalOpen,
    isFavoriteOpen,
    setIsFavoriteOpen,
    bikeStops,
  } = props;

  return (
    <header className={styles["header"]}>
      <div className={styles.nav_desk_main}>
        <div className={styles.logo}>
          <Image
            src="/images/EzBike.png"
            width={80}
            height={80}
            alt="logo"
            className={styles.logo_icon}
          />
          <div className={styles.logo_text}>
            <p className={styles.main_text}>EzBike</p>
            <p className={styles.sub_text}>Finding U-bike in Taipei is Easy!</p>
          </div>
        </div>

        <div className={styles.nav_list}>
          <div className={styles.link_card}>
            <Link href="/">搜尋頁</Link>
          </div>
          <div className={styles.link_card}>
            <Link href="/direction">導航頁</Link>
          </div>
          <div className={styles.link_card}>
            <Link href="/">單車活動(建置中)</Link>
          </div>
        </div>
      </div>

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
        <div
          className={`${styles.icon} ${styles.icon_love_list}`}
          onClick={() => setIsFavoriteOpen(!isFavoriteOpen)}
        >
          <CgUserList size={32} />
          {isFavoriteOpen && (
            <FavoriteStopsModal
              setIsFavoriteOpen={setIsFavoriteOpen}
              bikeStops={bikeStops}
            />
          )}
        </div>
        <div className={`${styles.icon} ${styles.icon_setting}`}>
          <BsGear size={32} />
        </div>
      </nav>
    </header>
  );
}
export default SearchNavBar;
