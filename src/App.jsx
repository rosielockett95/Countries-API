import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header.jsx";
import "./App.css";
import FilteredCountries from "./FilteredCountries.jsx";
import darkModeMagnifying from "./assets/design/search.png";
import magnifyingGlass from "./assets/design/magnifying-glass.png";
import { useCountry } from "./CartContext.jsx";

// Flag, Name, Population, Region, Capital

function App() {
  const [borders, getCountriesBorders] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [regions, setRegions] = useState([]);
  const [extractedRegion, setExtactedRegion] = useState("");
  // set the initial state of filteredCountries to an empty array
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searching, currentlySearching] = useState(false);
  const [filter, currentlyFiltering] = useState(false);
  const {
    clickCountryInfo,
    clickingCountry,
    countryInfo,
    setCountryInfo,
    darkMode,
    setDarkMode,
  } = useCountry();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=borders")
      .then((response) => response.json())
      .then((data) => {
        getCountriesBorders(data);
      })
      .catch((error) => console.log("Error loading data", error));
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=region,")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => console.log("Error loading data", error));
  }, []);

  const extractedRegions = regions.map((region) => region.region);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,tld,currencies,languages,borders,cca3",
    )
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.log("Error loading data", error));
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    currentlySearching(true);
    setSearchItem(searchTerm);
    currentlyFiltering(false);

    // filter the items using the filteredCountries state
    const filteredItems = countryInfo.filter((countries) =>
      // to LowerCase as searching is case sensitive otherwise
      countries.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredCountries(filteredItems);
  };

  const regionsWithoutDuplicates = [...new Set(extractedRegions)];

  // Europe, Africa, Americas, Antartic, Asia, Oceania

  const europe = countryInfo.filter(
    (countryinfo) => countryinfo.region === "Europe",
  );
  const africa = countryInfo.filter(
    (countryinfo) => countryinfo.region === "Africa",
  );
  const america = countryInfo.filter(
    (countryinfo) => countryinfo.region === "Americas",
  );
  const antarctic = countryInfo.filter(
    (countryinfo) => countryinfo.region === "Antarctic",
  );
  const asia = countryInfo.filter(
    (countryinfo) => countryinfo.region === "Asia",
  );
  const oceania = countryInfo.filter(
    (countryinfo) => countryinfo.region === "Oceania",
  );

  const handleRegion = (e) => {
    const extractedRegion = setExtactedRegion(e.target.value);
    currentlyFiltering(true);
  };

  const getCountryInformation = (country) => {
    clickCountryInfo(country);
    console.log(country);
    clickingCountry(true);
  };

  return (
    <>
      <div id="root">
        <Header />
        <div
          className={
            darkMode ? "main-content-wrapper dark" : "main-content-wrapper"
          }
        >
          <div className="search-container">
            <div
              className={
                darkMode ? "search-box-container dark" : "search-box-container"
              }
            >
              <div>
                <img
                  className="search-icon"
                  src={darkMode ? darkModeMagnifying : magnifyingGlass}
                />
              </div>
              <div>
                <label>
                  <input
                    className={darkMode ? "search-input dark" : "search-input"}
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder="Search for a country..."
                    type="text"
                  />
                </label>
              </div>
              <p></p>
            </div>
            <div
              className={
                darkMode
                  ? "select-region-container dark"
                  : "select-region-container"
              }
            >
              <select
                className={darkMode && "dark"}
                onChange={handleRegion}
                value={extractedRegion}
              >
                <option
                  className={darkMode ? "select-option dark" : "select-option"}
                  value=""
                  disabled
                >
                  Select a region
                </option>
                {regionsWithoutDuplicates.map((region) => (
                  <option>{region}</option>
                ))}
              </select>
            </div>
          </div>
          {filter && (
            <div className="filtered-countries-grid-container">
              <FilteredCountries
                getCountryInfo={getCountryInformation}
                region={"Europe"}
                extractedRegion={extractedRegion}
                countries={europe}
              />
              <FilteredCountries
                getCountryInfo={getCountryInformation}
                region={"Africa"}
                extractedRegion={extractedRegion}
                countries={africa}
              />
              <FilteredCountries
                getCountryInfo={getCountryInformation}
                region={"Americas"}
                extractedRegion={extractedRegion}
                countries={america}
              />
              <FilteredCountries
                getCountryInfo={getCountryInformation}
                region={"Antarctic"}
                extractedRegion={extractedRegion}
                countries={antarctic}
              />
              <FilteredCountries
                getCountryInfo={getCountryInformation}
                region={"Asia"}
                extractedRegion={extractedRegion}
                countries={asia}
              />
              <FilteredCountries
                getCountryInfo={getCountryInformation}
                region={"Oceania"}
                extractedRegion={extractedRegion}
                countries={oceania}
              />
            </div>
          )}
          <div className="countries-grid-container">
            {searching && !filter
              ? filteredCountries.map((item) => (
                  <Link className="country-link" to={`${item.cca3}`}>
                    <div
                      onClick={() => getCountryInformation(item)}
                      className={
                        darkMode
                          ? "country-container dark"
                          : "country-container"
                      }
                      key={item.name.common}
                    >
                      <div className="img-flag-container">
                        <img src={item.flags.png} />
                      </div>
                      <div
                        className={
                          darkMode
                            ? "country-info-container dark"
                            : "country-info-container"
                        }
                      >
                        <div className="country-name">{item.name.common}</div>
                        <div>
                          <div className="stats-container">
                            <p>Population:</p>
                            <p>{item.population.toLocaleString()}</p>
                          </div>
                          <div className="stats-container">
                            <p>Region:</p>
                            <p>{item.region}</p>
                          </div>
                          <div className="stats-container">
                            <p>Capital:</p>
                            <p>{item.capital} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : !searching &&
                !filter &&
                countryInfo.map((item) => (
                  <Link className="country-link" to={`${item.cca3}`}>
                    <div
                      onClick={() => getCountryInformation(item)}
                      className={
                        darkMode
                          ? "country-container dark"
                          : "country-container"
                      }
                      key={item.name.common}
                    >
                      <div className="img-flag-container">
                        <img src={item.flags.png} />
                      </div>
                      <div
                        className={
                          darkMode
                            ? "country-info-container dark"
                            : "country-info-container"
                        }
                      >
                        <div className="country-name">{item.name.common}</div>
                        <div>
                          <div className="stats-container">
                            <p>Population:</p>
                            <p>{item.population.toLocaleString()}</p>
                          </div>
                          <div className="stats-container">
                            <p>Region:</p>
                            <p>{item.region}</p>
                          </div>
                          <div className="stats-container">
                            <p>Capital:</p>
                            <p>{item.capital}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
