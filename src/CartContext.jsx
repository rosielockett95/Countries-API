import { createContext, useContext, useState } from "react";

const CountryContext = createContext();

export function CountryProvider({ children }) {
  const [country, clickCountryInfo] = useState(null);
  const [countryClicked, clickingCountry] = useState(false);
  const [countryInfo, setCountryInfo] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CountryContext.Provider
      value={{
        country,
        clickCountryInfo,
        countryClicked,
        clickingCountry,
        countryInfo,
        setCountryInfo,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
