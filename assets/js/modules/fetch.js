import { showCityInfo, showForecasts } from "./displayInfo.js";
import { saveCityToStorage } from "./localStorage.js";
import { showChart } from "./showChart.js";

const apiKey = "7b6a94519bbfa94e096e6593cd078294";
const apiKeyUnsplash = "RDmr-POInrf2jgsHSndSbYqsflqxkif4MRbWvl-fTmI";

const getForecastAndPicture = async (city) => {
  try {
    const [forecastResponse, pictureResponse] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      ),
      fetch(
        `https://api.unsplash.com/search/photos?query=${city}&page=1&client_id=${apiKeyUnsplash}`
      ),
    ]);

    if (!forecastResponse.ok) {
      alert("Oops! No city with that name was found");
      throw new Error("Failed to fetch forecast data");
    }

    const forecastResult = await forecastResponse.json();
    if (forecastResult.cod !== "200") {
      throw new Error(
        forecastResult.message ||
          "Unknown error occurred while fetching forecast data"
      );
    }
    saveCityToStorage(city);

    const pictureResult = await pictureResponse.json();
    let pictureURL = "./assets/images/1189.jpg"

    // Checks if city image was found and replaces it with default picture if not
    if (pictureResult.results.length > 0 && pictureResult.results[0].urls.small ) {
      pictureURL = pictureResult.results[0].urls.small
    }
    showForecasts(forecastResult.list);
    showCityInfo(forecastResult, pictureURL);
    showChart(forecastResult);
  } catch (error) {
    console.error(error);
  }
};


export { getForecastAndPicture };
