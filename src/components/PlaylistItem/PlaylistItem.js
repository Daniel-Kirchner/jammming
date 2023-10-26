import { useCallback } from "react";
import styles from "./PlaylistItem.module.css";

const PlaylistListItem = ({ playlist, onShowTracks, unFollowPlaylist }) => {
  const handleDeletePlaylist = useCallback(() => {
    unFollowPlaylist(playlist.id);
  }, [unFollowPlaylist, playlist]);

  return (
    <div className={styles.container}>
      <div onClick={onShowTracks} className={styles.playlistData}>
        <h3>{playlist.name}</h3>
        <p>
          {playlist.description} | number of tracks: {playlist.numberOfTracks}
        </p>
      </div>
      <button onClick={handleDeletePlaylist}>Delete</button>
    </div>
  );
};

export default PlaylistListItem;
