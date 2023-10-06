import Track from "../Track/Track";

import styles from "./Tracklist.module.css";

const Tracklist = ({ tracks }) => {
  return (
    <div className={styles.container}>
      {tracks.map((track) => {
        return <Track track={track} key={track.id} />;
      })}
    </div>
  );
};

export default Tracklist;
