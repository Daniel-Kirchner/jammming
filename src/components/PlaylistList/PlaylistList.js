import { useCallback } from "react";
import PlaylistListItem from "../PlaylistItem/PlaylistItem";

import styles from "./PlaylistList.module.css";

const PlaylistList = ({
  playlists,
  onShowTracks,
  handleCreatePlaylist,
  unFollowPlaylist,
}) => {
  const handleShowTracks = useCallback(
    (id) => {
      onShowTracks(id);
    },
    [onShowTracks]
  );

  return (
    <>
      <div className={styles.header}>
        <h2>My Playlists:</h2>
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
              unFollowPlaylist={unFollowPlaylist}
            />
          );
        })}
      </div>
    </>
  );
};

export default PlaylistList;
