import styles from "./BusTransitBox.module.scss";
function BusTransitBox(props) {
  const { routeData } = props;
  return (
    <div className={styles.bus_route}>{routeData.transit.line.short_name}</div>
  );
}

export default BusTransitBox;
