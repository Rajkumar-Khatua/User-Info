import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import UserInfoList from "./components/UserInfoList/UserInfoList";
import UserListSkeleton from "./components/UserListSkeleton/UserListSkeleton";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const storedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedSearchHistory);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const updatedHistory = [...searchHistory, term];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Show user card for the searched term
    const foundUser = users.find((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );

    if (foundUser) {
      setSelectedUser(foundUser);
    }
  };

  const handleSort = () => {
    setSorted(!sorted);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sorted ? a.name.localeCompare(b.name) : 0));

  return (
    <div className="app-container">
      <SearchBar
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        handleSort={handleSort}
        searchHistory={searchHistory}
        clearSearchHistory={clearSearchHistory}
      />
      <div className="user-list-container">
        {loading ? <UserListSkeleton/> : <UserInfoList users={filteredUsers} />}
      </div>
    </div>
  );
};

export default App;
