import { useEffect, useState, useCallback } from "react";
import Spotify from "../../utils/Spotify";

import SearchResults from "../SearchResults/SearchResults";
import PlaylistList from "../PlaylistList/PlaylistList";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";

import styles from "./Main.module.css";

const Main = ({ searchResults, user }) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    if (!user) {
      setUserPlaylists([]);
      return;
    }

    Spotify.getUserPlaylists(user.id)
      .then((data) => {
        if (!data) return;
        setUserPlaylists(data);
      })
      .catch((error) => console.error(error));
  }, [user]);

  const showTracks = useCallback((id) => {
    Spotify.getPlaylistTracks(id)
      .then((data) => {
        if (!data) return;
        setPlaylistTracks(data.tracks);
        setPlaylistName(data.name);
      })
      .catch((error) => console.error(error));
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  return (
    <main>
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <div className={styles.container}>
        {!playlistTracks.length ? (
          <PlaylistList
            playlists={userPlaylists}
            onShowTracks={showTracks}
            user={user}
          />
        ) : (
          <PlaylistTracks
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
