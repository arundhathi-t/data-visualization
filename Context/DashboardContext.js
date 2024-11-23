// src/context/DashboardContext.js
import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  return (
    <DashboardContext.Provider
      value={{
        searchTerm,
        timeFilter,
        handleSearchChange,
        handleFilterChange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
