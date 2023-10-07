import { useCallback } from "react";

import styles from "./Track.module.css";

const Track = ({ track, inPlaylist, onAdd, onRemove }) => {
  const addTrack = useCallback(
    (e) => {
      onAdd(track);
    },
    [onAdd, track]
  );

  const removeTrack = useCallback(
    (e) => {
      onRemove(track);
    },
    [onRemove, track]
  );

  return (
    <div className={styles.container}>
      <div>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {inPlaylist ? (
        <button className={styles.btn} onClick={removeTrack}>
          -
        </button>
      ) : (
        <button className={styles.btn} onClick={addTrack}>
          +
        </button>
      )}
    </div>
  );
};

export default Track;
