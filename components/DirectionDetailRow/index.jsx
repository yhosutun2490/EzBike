import styles from "./DirectionDetailRow.module.scss";
function DirectionDetailRow(props) {
  const { directions, travelMode } = props;
  return (
    <div>
      <div>
        <p>時間</p>
        <p></p>
      </div>
      <div>
        <p>總距離</p>
        <p></p>
      </div>
    </div>
  );
}

export default DirectionDetailRow;
