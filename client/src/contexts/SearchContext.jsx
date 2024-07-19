import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const contextValue = useMemo(
    () => ({
      searchType,
      setSearchType,
      searchQuery,
      setSearchQuery,
    }),
    [searchType, searchQuery]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SearchContext, SearchProvider };
