import { typeWriterEffect } from "./modules/animations.js";
import { getForecast } from "./modules/fetch.js";

const cityInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#search");
const mainTitle = document.querySelector("h1");
const form = document.querySelector("#search-city");

// Adds an ugly animation to main title
typeWriterEffect("Your Weather, Your Way!", mainTitle);

// Enables form submission when pressing enter.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = cityInput.value;
  getForecast(cityInput.value);
  cityInput.value = "";
});

// Enables form submission when clicking search button
searchButton.addEventListener("click", () => {
  getForecast(cityInput.value);
  cityInput.value = "";
});
