import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  return (
    <>
      <header>
        <h1>Jamming</h1>
        <hr />
        <SearchBar />
      </header>
      <main>
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
