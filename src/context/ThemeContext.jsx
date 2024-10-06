import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // LocalStorage'dan theme holatini o'qish
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // LocalStorage'ga theme holatini saqlash
    localStorage.setItem('theme', theme);
    document.body.className = theme; // sahifada tema o'zgarishi uchun
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
