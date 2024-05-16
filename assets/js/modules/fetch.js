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
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKeyUnsplash}`
      ),
    ]);

    if (!forecastResponse.ok) {
      alert("Oops! No city of that name was found");
      throw new Error("Failed to fetch forecast data");
    }

    const forecastResult = await forecastResponse.json();
    if (forecastResult.cod !== "200") {
      throw new Error(
        forecastResult.message ||
          "Unknown error occurred while fetching forecast data"
      );
    }

    const pictureResult = await pictureResponse.json();
    const pictureURL = getCityPictureFromResponse(pictureResult);
    saveCityToStorage(city);
    showForecasts(forecastResult.list);
    showCityInfo(forecastResult, pictureURL);
    showChart(forecastResult);
  } catch (error) {
    console.error(error);
  }
};

const getCityPictureFromResponse = (response) => {
  if (response.results.length > 0 && response.results[0].urls.small) {
    return response.results[0].urls.small;
  } else {
    return null;
  }
};

export { getForecastAndPicture };
