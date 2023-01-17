import styles from "./StopStatusRow.module.scss";
import Image from "next/image";
function StopStatusRow() {
  return (
    <div className={styles.introduction}>
      <div className={`${styles.intro_content} ${styles.normal}`}>
        <Image
          src="/images/normal-bike.jpg"
          alt="normal-bike"
          className={styles.icon}
          width={32}
          height={32}
        />
        <p className={styles.intro_note}>正常租借</p>
      </div>
      <div className={`${styles.intro_content} ${styles.rent}`}>
        <Image
          src="/images/no-rent-bike.svg"
          alt="lack-renting"
          className={styles.icon}
          width={32}
          height={32}
        />
        <p className={styles.intro_note}>租借數量不足</p>
      </div>
      <div className={`${styles.intro_content} ${styles.park}`}>
        <Image
          src="/images/no-park-site.png"
          alt="lack-parking"
          className={styles.icon}
          width={32}
          height={32}
        />
        <p className={styles.intro_note}>停車位不足</p>
      </div>
    </div>
  );
}

export default StopStatusRow;
