import Tracklist from "../Tracklist/Tracklist";

import styles from "./SearchResults.module.css";

const SearchResults = ({ searchResults }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Results For: asd</h2>
      <Tracklist tracks={searchResults} />
    </div>
  );
};

export default SearchResults;
