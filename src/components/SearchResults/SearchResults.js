import Tracklist from "../Tracklist/Tracklist";

import styles from "./SearchResults.module.css";

const SearchResults = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Searching For: asd</h2>
      <Tracklist />
    </div>
  );
};

export default SearchResults;
