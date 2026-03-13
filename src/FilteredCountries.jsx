import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCountry } from "./CartContext.jsx";

export default function FilteredCountries({
  countries,
  region,
  extractedRegion,
  getCountryInfo,
}) {
  const { code } = useParams();

  const {
    country,
    clickCountryInfo,
    countryClicked,
    clickingCountry,
    countryInfo,
    setCountryInfo,
    darkMode,
  } = useCountry();

  const selectedCountry = countryInfo.find(
    (countries) => countries.cca3 === code,
  );
  return (
    <>
      {extractedRegion === region &&
        countries.map((country) => (
          <Link className="country-link" to={`${country.cca3}`}>
            <div
              onClick={() => getCountryInfo(country)}
              className={
                darkMode ? "country-container dark" : "country-container"
              }
              key={country.name.common}
            >
              <div className="img-flag-container">
                <img src={country.flags.png} alt={country.name.common} />
              </div>

              <div className="country-info-container">
                <div className="country-name">{country.name.common}</div>

                <div className="stats-container">
                  <p>Population:</p>
                  <p>{country.population.toLocaleString()}</p>
                </div>

                <div className="stats-container">
                  <p>Region:</p>
                  <p>{country.region}</p>
                </div>

                <div className="stats-container">
                  <p>Capital:</p>
                  <p>{country.capital}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}
