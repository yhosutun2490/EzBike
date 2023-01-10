import styles from "./DirectionModeBar.module.scss";

// React Icon
import { IoMdBus } from "react-icons/io";
import { MdDirectionsBike } from "react-icons/md";
import { FaWalking } from "react-icons/fa";

function DirectionModeBar() {
  return (
    <div className={styles.travel_mode}>
        <FaWalking size={32} />
        <IoMdBus size={32} />
        <MdDirectionsBike size={32} />
    </div>
  );
}

export default DirectionModeBar;
