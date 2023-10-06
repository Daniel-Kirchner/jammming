import styles from "./Track.module.css";

const Track = ({ track }) => {
  return (
    <div className={styles.container}>
      <div>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <button className={styles.btn}>+</button>
    </div>
  );
};

export default Track;
