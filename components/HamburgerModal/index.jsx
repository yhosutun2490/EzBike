import styles from "./HamburgerModal.module.scss";
import { FaBars } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
function HamburgerModal(props) {
  const { setIsModalOpen } = props;
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => {
          setIsModalOpen(false);
        }}
      ></div>
      ;
      <div className={styles.main_modal}>
        <div
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <FaBars size={32} />
        </div>

        <div className={styles.user_info}>
          <BsPersonCircle size={60} />
          <div className={styles.user_detail}>
            <p>Hi</p>
            <p>User 1</p>
          </div>
        </div>
        <div className={styles.page_cluster}>
          <div className={styles.link_card}>
            <Link href="/">搜尋頁</Link>
          </div>
          <div className={styles.link_card}>
            <Link href="/">導航頁</Link>
          </div>
          <div className={styles.link_card}>
            <Link href="/">使用說明</Link>
          </div>
          <div className={styles.link_card}>
            <Link href="/">其他活動</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HamburgerModal;
