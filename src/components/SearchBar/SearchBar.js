import { useCallback, useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(
    (e) => {
      e.preventDefault();
      onSearch(term);
    },
    [onSearch, term]
  );

  return (
    <form onSubmit={search}>
      <input placeholder="Enter A Song Title" onChange={handleTermChange} />
      <button>SEARCH</button>
    </form>
  );
};

export default SearchBar;
