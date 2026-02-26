import { Link } from "react-router-dom";

export default function FilteredCountries({
  countries,
  region,
  extractedRegion,
  getCountryInfo,
}) {
  return (
    <>
      {extractedRegion === region &&
        countries.map((country) => (
          <Link className="country-link" to="/countryinfo">
            <div
              onClick={() => getCountryInfo(country)}
              className="country-container"
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
