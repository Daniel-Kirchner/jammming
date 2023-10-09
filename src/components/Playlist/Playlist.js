import { useCallback, useRef } from "react";

import Tracklist from "../Tracklist/Tracklist";

import styles from "./Playlist.module.css";

const Playlist = ({ playlistTracks, playlistName, onRemove, onNameChange }) => {
  const inputRef = useRef(null);

  const handleKeyUp = useCallback((event) => {
    if (event.keyCode === 13 || event.keyCode === 27) {
      event.preventDefault();
      inputRef.current.blur();
    }
  }, []);
  const handleNameChange = useCallback(
    (e) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={styles.title}
          defaultValue={playlistName}
          onChange={handleNameChange}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
        <button>Save Playlist To Spotify</button>
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
