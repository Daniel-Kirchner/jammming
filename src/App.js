import { useCallback, useState } from "react";

import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

import styles from "./App.module.css";

import { trackData } from "./utils/mockdata";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const search = useCallback((term) => {
    const filteredResults = trackData.filter((track) =>
      track.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1>Jammming</h1>
        <hr />
        <SearchBar onSearch={search} />
      </header>
      <main className={styles.main}>
        <SearchResults searchResults={searchResults} />
        <Playlist />
      </main>
      <footer>
        <p>Made by Daniel Kirchner</p>
      </footer>
    </>
  );
}

export default App;
