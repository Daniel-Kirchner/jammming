import Tracklist from "../Tracklist/Tracklist";

import styles from "./Playlist.module.css";

const Playlist = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Playlist name</h2>
        <button>Save To Spotify</button>
      </div>
      {/* <Tracklist /> */}
    </div>
  );
};

export default Playlist;
