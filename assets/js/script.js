import { getForecastAndPicture } from "./modules/fetch.js";
import { loadCityFromStorage } from "./modules/localStorage.js";

const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#search");
const form = document.querySelector("#search-city");

// Attempts to get city from local storage to display city weather
const storedCity = loadCityFromStorage();
if (storedCity) {
  cityInput.value = storedCity;
  getForecastAndPicture(storedCity);
}

// Enables form submission when pressing enter.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getForecastAndPicture(cityInput.value);
  cityInput.value = "";
});

// Enables form submission when clicking search button
searchButton.addEventListener("click", () => {
  getForecastAndPicture(cityInput.value);
  cityInput.value = "";
});
