import { useEffect, useState, useCallback } from "react";
import Spotify from "../../utils/Spotify";

import SearchResults from "../SearchResults/SearchResults";
import PlaylistList from "../PlaylistList/PlaylistList";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";

import styles from "./Main.module.css";

const Main = ({ searchResults, user, removeOnAdd }) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistID, setPlaylistID] = useState();

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

  const showTracks = useCallback(async (id) => {
    const data = await Spotify.getPlaylistTracks(id);
    if (!data) return;
    setPlaylistTracks(data.tracks);
    setPlaylistName(data.name);
    setPlaylistID(id);
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;
      if (!playlistName) setPlaylistName("New Playlist");

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      removeOnAdd(track);
    },
    [playlistTracks, playlistName, removeOnAdd]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const removePlaylistState = useCallback(() => {
    setPlaylistName("");
    setPlaylistTracks([]);
    setPlaylistID();
  }, []);

  const createPlaylist = useCallback(async () => {
    const playlist = await Spotify.createPlaylist(playlistName);
    if (!playlist.id) return;
    if (playlistTracks.length) {
      await Spotify.addItemsToPlaylist(playlist.id, playlistTracks);
      playlist.numberOfTracks = playlistTracks.length;
    }
    setUserPlaylists((prevPlaylists) => [...prevPlaylists, playlist]);
  }, [playlistName, playlistTracks]);

  const unFollowPlaylist = useCallback(async (id) => {
    if (await Spotify.unFollowPlaylist(id)) {
      setUserPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== id)
      );
    }
  }, []);

  return user ? (
    <main>
      <SearchResults searchResults={searchResults} onAdd={addTrack} />
      <div className={styles.container}>
        {!(playlistName || playlistTracks.length) ? (
          <PlaylistList
            playlists={userPlaylists}
            onShowTracks={showTracks}
            handleCreatePlaylist={updatePlaylistName}
            unFollowPlaylist={unFollowPlaylist}
          />
        ) : (
          <PlaylistTracks
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            playlistID={playlistID}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onBack={removePlaylistState}
            createPlaylist={createPlaylist}
          />
        )}
      </div>
    </main>
  ) : (
    <h1>Please Log in to Spotify!</h1>
  );
};

export default Main;
