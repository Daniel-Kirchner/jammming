import { useCallback, useState } from "react";

import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

import styles from "./App.module.css";

import { mockSearchResults, mockPlaylistTracks } from "./utils/mockdata";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState(mockPlaylistTracks);
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const search = useCallback((term) => {
    const filteredResults = mockSearchResults.filter((track) =>
      track.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
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

  return (
    <>
      <header className={styles.header}>
        <h1>Jammming</h1>
        <hr />
        <SearchBar onSearch={search} />
      </header>
      <main className={styles.main}>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
        />
      </main>
      <footer>
        <p>Made by Daniel Kirchner</p>
      </footer>
    </>
  );
}

export default App;
