import { showCityInfo, showForecasts } from "./displayInfo.js";
import { saveCityToStorage } from "./localStorage.js";

const apiKey = "7b6a94519bbfa94e096e6593cd078294";

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
    showForecasts(result.list);
  } catch (error) {
    console.log(error);
  }
};

export { getForecast };
