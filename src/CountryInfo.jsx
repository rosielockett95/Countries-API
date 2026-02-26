import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useCountry } from "./CartContext.jsx";

export default function CountryInfo() {
  const { country, clickCountryInfo, countryClicked, clickingCountry } =
    useCountry();

  return (
    <>
      <Header />
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      {countryClicked ? (
        <div className="country-details-container">
          <div>
            <img src={country.flags.png} />
          </div>
          <div className="further-details-container">
            <div>
              <h2>{country.name.official}</h2>
            </div>
            <div className="info-text">
              <div>
                <div className="further-details-inner">
                  <p>Native Name:</p>
                  <p>{country.name.common}</p>
                </div>
                <div className="further-details-inner">
                  <p>Population:</p>
                  <div>{country.population.toLocaleString()}</div>
                </div>
                <div className="further-details-inner">
                  <p>Region:</p>
                  <div>{country.region}</div>
                </div>
                <div className="further-details-inner">
                  <p>Sub Region:</p>
                  <div>{country.subregion}</div>
                </div>
                <div className="further-details-inner">
                  <p>Capital:</p>
                  <div>{country.capital}</div>
                </div>
              </div>
              <div>
                <div className="further-details-inner">
                  <p>Top Level Domain:</p>
                  <div>{country.tld}</div>
                </div>
                <div className="further-details-inner">
                  <p>Currencies:</p>
                  <div>{Object.values(country.currencies)[0].name}</div>
                </div>
                <div className="further-details-inner">
                  <p>Languages:</p>
                  <div>{Object.values(country.languages).join(", ")}</div>
                </div>
              </div>
            </div>
          </div>
          <div>{country.borders}</div>
        </div>
      ) : (
        <div>No Country Selected</div>
      )}
    </>
  );
}
