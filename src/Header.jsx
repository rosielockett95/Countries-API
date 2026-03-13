import { useCountry } from "./CartContext";
import crescentMoon from "./assets/design/crescent-moon.png";
import yellowSunIcon from "./assets/design/sun-yellow.png";

export default function Header({}) {
  const { darkMode, setDarkMode } = useCountry();

  const handleDarkMode = () => {
    // Toogles between state
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <div className={darkMode && "dark"}>
        <div
          className={darkMode ? "header-container dark" : "header-container"}
        >
          <div>
            <h1>Where in the world?</h1>
          </div>
          <div onClick={handleDarkMode} className="mode-container">
            <img
              className="mode-img"
              src={darkMode ? yellowSunIcon : crescentMoon}
            />
            <button className={darkMode ? "mode-button dark" : "mode-button"}>
              <p>{darkMode ? "Light" : "Dark"} Mode</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
