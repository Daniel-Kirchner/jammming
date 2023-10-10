import styles from "./PlaylistItem.module.css";

const PlaylistListItem = ({ playlist, onShowTracks }) => {
  return (
    <div className={styles.container} onClick={onShowTracks}>
      <div>
        <h3>{playlist.name}</h3>
        <p>
          {playlist.description} | number of tracks: {playlist.numberOfTracks}
        </p>
      </div>
    </div>
  );
};

export default PlaylistListItem;
