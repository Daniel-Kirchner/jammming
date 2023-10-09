import { useCallback, useEffect, useState } from "react";

import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

import Spotify from "./utils/Spotify";
import styles from "./App.module.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [token, setToken] = useState(""); // TODO: remove token state (update login button)
  const [user, setUser] = useState({});

  useEffect(() => {
    setToken(Spotify.getAccessToken());
  }, []);

  useEffect(() => {
    if (token) {
      Spotify.getCurrentUser(token)
        .then((data) => setUser(data))
        .catch((error) => console.error(error));
    } else {
      setUser({});
    }
  }, [token]);

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

  console.log("App rendered");

  return (
    <>
      <header className={styles.header}>
        <h1>Jammming</h1>
        {token ? (
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
