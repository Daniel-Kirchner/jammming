import { useCallback, useEffect, useState } from "react";

import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

import Spotify from "./utils/Spotify";
import styles from "./App.module.css";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    setToken(Spotify.getAccessToken());
  }, []);

  useEffect(() => {
    if (!token) {
      setUser();
      return;
    }

    Spotify.getCurrentUser()
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [token]);

  useEffect(() => {
    if (!user) {
      setPlaylistTracks([]);
      setPlaylistName("");
      return;
    }

    Spotify.getPlaylistTracks(user.id)
      .then((data) => {
        if (!data) return;
        setPlaylistTracks(data.tracks);
        setPlaylistName(data.name);
      })
      .catch((error) => console.error(error));
  }, [user]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
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
    <>
      <header className={styles.header}>
        <h1>Jammming</h1>
        {user ? (
          <>
            <h1>Welcome {user.display_name}</h1>
            <button onClick={() => setToken(Spotify.logout)}>Logout</button>
            <SearchBar onSearch={search} />
          </>
        ) : (
          <a href={Spotify.getAuthUrl()}>
            <button>Login to Spotify</button>
          </a>
        )}
        <hr />
      </header>
      <main className={styles.main}>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
        />
      </main>
      <footer>
        <p>Made by Daniel Kirchner</p>
      </footer>
    </>
  );
}

export default App;
