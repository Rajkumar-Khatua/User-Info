import React, { useState } from 'react';
import "./SearchBar.scss"

const SearchBar = ({ handleSearch, searchTerm, handleSort, searchHistory, clearSearchHistory }) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value.trim(); // Remove leading and trailing spaces
    handleSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const trimmedSearchTerm = searchTerm.trim();

      if (trimmedSearchTerm !== '') {
        handleSearch(trimmedSearchTerm);
        // No need to update search history here; it will be updated in handleSearch function
        setShowHistory(false); // Close history after pressing Enter
      }
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={() => setShowHistory(false)}
        onClick={handleKeyPress}
      />
      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
      {showHistory && (
        <div className="search-history">
          <p>
            Search History: 
            <button className="clear-history-button" onClick={clearSearchHistory}>
              Clear History
            </button>
          </p>
          <ul>
            {searchHistory
              .filter(term => term.trim() !== '') // Filter out blank spaces
              .slice()
              .reverse() // Reverse the order to have the last search at the top
              .map((term, index) => (
                <li key={index} onClick={() => handleSearch(term)}>
                  {term}
                </li>
              ))}
          </ul>
        </div>
      )}
      <button onClick={handleSort}>Sort by Name</button>
    </div>
  );
};

export default SearchBar;
