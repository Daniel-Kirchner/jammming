import { useCallback, useEffect, useState } from "react";
import Spotify from "./utils/Spotify";

import Main from "./components/Main/Main";
import SearchBar from "./components/SearchBar/SearchBar";

import styles from "./App.module.css";

export function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);

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

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const removeOnAdd = useCallback((track) => {
    setSearchResults((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  return (
    <>
      <header className={styles.headers}>
        <div className={styles.logo}>
          Ja<b>mmm</b>ing
        </div>
        {user ? (
          <>
            <SearchBar onSearch={search} />
            <p>Welcome {user.display_name}</p>
            <button onClick={() => setToken(Spotify.logout)}>Logout</button>
          </>
        ) : (
          <a href={Spotify.getAuthUrl()}>
            <button>Login to Spotify</button>
          </a>
        )}
      </header>
      <hr />
      <Main
        searchResults={searchResults}
        user={user}
        removeOnAdd={removeOnAdd}
      />
      <footer>
        <p>Made by Daniel Kirchner</p>
      </footer>
    </>
  );
}

export default App;
