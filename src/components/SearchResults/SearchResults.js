import Tracklist from "../Tracklist/Tracklist";

import styles from "./SearchResults.module.css";

const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Search Results:</h2>
      <Tracklist tracks={searchResults} inPLaylist={false} onAdd={onAdd} />
    </div>
  );
};

export default SearchResults;
