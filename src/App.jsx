import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import "./App.css";
import FilteredCountries from "./filteredcountries.jsx";
import magnifyingGlass from "../../frontend/src/assets/design/magnifying-glass.png";
import { useCountry } from "./CartContext.jsx";

// Flag, Name, Population, Region, Capital

function App() {
  const [countryInfo, setCountryInfo] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [regions, setRegions] = useState([]);
  const [extractedRegion, setExtactedRegion] = useState("");
  // set the initial state of filteredCountries to an empty array
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searching, currentlySearching] = useState(false);
  const [filter, currentlyFiltering] = useState(false);
  const { country, clickCountryInfo, countryClicked, clickingCountry } =
    useCountry();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=region")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      })
      .catch((error) => console.log("Error loading data", error));
  }, []);

  const extractedRegions = regions.map((region) => region.region);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,subregion,tld,currencies,languages,borders",
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
      <Header />
      <div className="main-content-wrapper">
        <div className="search-container">
          <div className="search-box-container">
            <div>
              <img className="search-icon" src={magnifyingGlass} />
            </div>
            <div>
              <label>
                <input
                  className="search-input"
                  value={searchItem}
                  onChange={handleInputChange}
                  placeholder="Search for a country..."
                  type="text"
                />
              </label>
            </div>
            <p></p>
          </div>
          <div className="select-region-container">
            <select onChange={handleRegion} value={extractedRegion}>
              <option className="select-option" value="" disabled>
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
                <Link className="country-link" to="/countryinfo">
                  <div
                    onClick={() => getCountryInformation(item)}
                    className="country-container"
                    key={item.name.common}
                  >
                    <div className="img-flag-container">
                      <img src={item.flags.png} />
                    </div>
                    <div className="country-info-container">
                      <div className="country-name">{item.name.common}</div>
                      <div>
                        <div className="stats-container">
                          <p>Population:</p>
                          <p>{item.population}</p>
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
                <Link className="country-link" to="/countryinfo">
                  <div
                    onClick={() => getCountryInformation(item)}
                    className="country-container"
                    key={item.name.common}
                  >
                    <div className="img-flag-container">
                      <img src={item.flags.png} />
                    </div>
                    <div className="country-info-container">
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
    </>
  );
}

export default App;
