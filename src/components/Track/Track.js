import styles from "./Track.module.css";

const Track = () => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h3>Track Name</h3>
          <p>
            <span>artist</span> | <span>album</span>
          </p>
        </div>
        <button className={styles.btn}>+</button>
      </div>
    </>
  );
};

export default Track;
