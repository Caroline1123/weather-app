import { showCityInfo, showForecasts } from "./displayInfo.js";
import { saveCityToStorage } from "./localStorage.js";
import { showChart } from "./showChart.js";

const apiKey = "7b6a94519bbfa94e096e6593cd078294";
const apiKeyUnsplash = "RDmr-POInrf2jgsHSndSbYqsflqxkif4MRbWvl-fTmI";

const getForecast = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    if (result.cod !== "200") {
      throw new Error(result.message || "Unknown error occurred");
    }
    saveCityToStorage(city);
    showCityInfo(result);
    showChart(result);
    showForecasts(result.list);
  } catch (error) {
    console.log(error);
  }
};

const getCityPicture = async (city) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyUnsplash}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch picture data");
    }
    const result = await response.json();
    if (result.results[0].urls.small) {
      return result.results[0].urls.small;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getForecast, getCityPicture };
