import { useCallback } from "react";
import PlaylistListItem from "../PlaylistItem/PlaylistItem";

import styles from "./PlaylistList.module.css";

const PlaylistList = ({ playlists, onShowTracks, handleCreatePlaylist }) => {
  const handleShowTracks = useCallback(
    (id) => {
      onShowTracks(id);
    },
    [onShowTracks]
  );

  return (
    <>
      <div className={styles.header}>
        <h2>My Public Playlists:</h2>
        <button onClick={() => handleCreatePlaylist("New Playlist")}>
          Create New Playlist
        </button>
      </div>
      <div className={styles.container}>
        {playlists.map((playlist) => {
          return (
            <PlaylistListItem
              playlist={playlist}
              key={playlist.id}
              onShowTracks={() => handleShowTracks(playlist.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default PlaylistList;
