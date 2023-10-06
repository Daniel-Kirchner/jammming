import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

import styles from "./App.module.css";

function App() {
  return (
    <>
      <header className={styles.header}>
        <h1>Jammming</h1>
        <hr />
        <SearchBar />
      </header>
      <main className={styles.main}>
        <SearchResults />
        <Playlist />
      </main>
      <footer>
        <p>Made by Daniel Kirchner</p>
      </footer>
    </>
  );
}

export default App;
