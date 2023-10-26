import Track from "../Track/Track";

import styles from "./Tracklist.module.css";

const Tracklist = ({ tracks, inPLaylist, onAdd, onRemove }) => {
  return (
    <div className={styles.container}>
      {tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            inPlaylist={inPLaylist}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
