import { useCallback, useRef } from "react";

import Tracklist from "../Tracklist/Tracklist";

import styles from "./PlaylistTracks.module.css";

const PlaylistTracks = ({
  playlistTracks,
  playlistName,
  playlistID,
  onRemove,
  onNameChange,
  onBack,
  createPlaylist,
}) => {
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

  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleCreate = useCallback(() => {
    createPlaylist();
    handleBack();
  }, [createPlaylist, handleBack]);

  return (
    <>
      <button onClick={handleBack}>{"<"}</button>
      <div className={styles.header}>
        <input
          className={styles.title}
          defaultValue={playlistName || "New Playlist"}
          onChange={handleNameChange}
          onKeyUp={handleKeyUp}
          ref={inputRef}
        />
        {playlistID ? (
          <button>Update Playlist</button>
        ) : (
          <button onClick={handleCreate}>Create Playlist</button>
        )}
      </div>
      <Tracklist
        tracks={playlistTracks}
        inPLaylist={true}
        onRemove={onRemove}
      />
    </>
  );
};

export default PlaylistTracks;
