import Tracklist from "../Tracklist/Tracklist";

import styles from "./Playlist.module.css";

const Playlist = ({ playlistName, playlistTracks, onRemove }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{playlistName}</h2>
        <button>Save To Spotify</button>
      </div>
      <Tracklist
        tracks={playlistTracks}
        inPLaylist={true}
        onRemove={onRemove}
      />
    </div>
  );
};

export default Playlist;
