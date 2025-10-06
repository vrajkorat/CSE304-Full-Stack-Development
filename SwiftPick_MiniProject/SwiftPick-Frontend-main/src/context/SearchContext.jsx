import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setvalues] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={{ values, setvalues }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
