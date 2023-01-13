import styles from "./MetroTransitBox.module.scss";
function MetroTransitBox(props) {
  const { routeData } = props;
  console.log(routeData);
  return (
    <div className={styles.metro_route}>
      <div className={styles.route_name}>{routeData.transit.line.name}</div>
    </div>
  );
}

export default MetroTransitBox;
