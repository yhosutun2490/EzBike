import styles from "./MetroTransitBox.module.scss";
function MetroTransitBox(props) {
  const { routeData } = props;
  console.log(routeData);
  return (
    <div className={styles.metro_route}>
      {routeData.transit.line.agencies[0].name === "台北捷運" && (
        <div className={styles.route_name}>{routeData.transit.line.name}</div>
      )}
    </div>
  );
}

export default MetroTransitBox;
