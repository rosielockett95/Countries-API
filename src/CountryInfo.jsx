import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { useCountry } from "./CartContext.jsx";
import backArrow from "./assets/design/left-arrow.png";
import backArrowWhite from "./assets/design/left-arrow-dark.png";

export default function CountryInfo() {
  const { code } = useParams();

  const { countryClicked, countryInfo, darkMode, setDarkMode } = useCountry();

  const selectedCountry = countryInfo.find(
    (countries) => countries.cca3 === code,
  );

  return (
    <>
      <Header />
      <div className={darkMode && "dark"}>
        <div className="content-container">
          <div
            className={
              darkMode ? " back-button-container dark" : "back-button-container"
            }
          >
            <Link className="back-button" to="/">
              <button className={darkMode && "dark"}>
                <div>
                  <img src={darkMode ? backArrowWhite : backArrow} />
                </div>
                <div>Back</div>
              </button>
            </Link>
          </div>
          {selectedCountry && countryClicked ? (
            <>
              <div className="country-details-container">
                <div className="flag-container">
                  <img src={selectedCountry.flags.png} />
                </div>
                <div className="further-details-container">
                  <div>
                    <h2>{selectedCountry.name.official}</h2>
                  </div>
                  <div className="info-text">
                    <div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Native Name:</p>
                        <p>{selectedCountry.name.common}</p>
                      </div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Population:</p>
                        <div>{selectedCountry.population.toLocaleString()}</div>
                      </div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Region:</p>
                        <div>{selectedCountry.region}</div>
                      </div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Sub Region:</p>
                        <div>
                          {selectedCountry.subregion ? (
                            selectedCountry.subregion
                          ) : (
                            <p className="not-found-text">
                              No sub-region found
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Capital:</p>
                        <div>
                          {selectedCountry.capital.length > 0 ? (
                            selectedCountry.capital
                          ) : (
                            <p className="not-found-text">No capital found</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="further-details-inner">
                        <p className="further-details-title">
                          Top Level Domain:
                        </p>
                        <div>{selectedCountry.tld}</div>
                      </div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Currencies:</p>
                        <div>
                          {selectedCountry.currencies &&
                          Object.values(selectedCountry.currencies).length >
                            0 ? (
                            Object.values(selectedCountry.currencies)[0].name
                          ) : (
                            <div>
                              <p className="not-found-text">
                                No currencies found
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="further-details-inner">
                        <p className="further-details-title">Languages:</p>
                        <div>
                          {selectedCountry.languages &&
                          Object.values(selectedCountry.languages) > 0 ? (
                            Object.values(selectedCountry.languages).join(", ")
                          ) : (
                            <p className="not-found-text">No languages found</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-countries-container">
                    <div>
                      <p>Border Countries:</p>
                    </div>
                    <div className="border-links-container">
                      {selectedCountry.borders.length > 0 ? (
                        selectedCountry.borders.map((code) => {
                          const matchedCountry = countryInfo.find(
                            (selected) => selected.cca3 === code,
                          );
                          return (
                            <Link to={`/${code}`} key={code}>
                              <button
                                className={
                                  darkMode
                                    ? "border-links-button dark"
                                    : "border-links-button"
                                }
                              >
                                {matchedCountry.name.common}
                              </button>
                            </Link>
                          );
                        })
                      ) : (
                        <div>
                          <p>No border countries found</p>{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>No Country Selected</div>
          )}
        </div>
      </div>
    </>
  );
}
