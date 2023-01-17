import styles from "./Footer.module.scss";
import Link from "next/link";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.social_media}>
        <a
          href="https://www.facebook.com/nick.haung"
          target="_blank"
          rel="noreferrer"
        >
          <BsFacebook size={50} color="grey" />
        </a>
        <a
          href="https://github.com/yhosutun2490"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub size={50} color="grey" />
        </a>
        <a
          href="https://www.linkedin.com/in/%E6%80%9D%E6%83%87-rafael-huang-%E9%BB%83-1074a7199/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin size={50} color="grey" />
        </a>
      </div>
      <div className={styles.thanks}>
        感謝台北市交通局-YouBike2.0臺北市公共自行車即時資訊
      </div>
      <div className={styles.right}>Copyright © 2023 Author Rafael Huang.</div>
    </div>
  );
}

export default Footer;
