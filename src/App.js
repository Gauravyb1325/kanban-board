import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState('status');
  const [selectedOrdering, setSelectedOrdering] = useState('users');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function fetchApi() {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <Navbar
          selectedGrouping={selectedGrouping}
          setSelectedGrouping={setSelectedGrouping}
          selectedOrdering={selectedOrdering}
          setSelectedOrdering={setSelectedOrdering}
          users={users}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownRef={dropdownRef}
        />
        <Dashboard
          users={users}
          tickets={tickets}
          selectedGrouping={selectedGrouping}
          selectedOrdering={selectedOrdering}
        />
      </div>
    </div>
  );
}

export default App;
