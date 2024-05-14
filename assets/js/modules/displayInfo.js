import { formatDate } from "./formatDate.js";
import { getCityPicture } from "./fetch.js";

const generateCardContent = (obj) => {
  const date = formatDate(obj.dt_txt);
  let weatherIconPath = obj.weather[0].icon;
  if (weatherIconPath.includes("n")) {
    weatherIconPath = weatherIconPath.replace("n", "d");
  }
  let content = `
    <p class="date">${date}</p>
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${weatherIconPath}@2x.png">
    <p class="temperature">${obj.main.temp.toFixed(1)}° C</p>
    <div class="additional-info">
      <p class="humidity"><img src="./assets/images/humidity.svg"> ${
        obj.main.humidity
      } %</p>
      <p class="wind"><img src="./assets/images/wind.svg"> ${
        obj.wind.speed
      } km/h</p>
    </div>
    `;
  return content;
};

const showCityInfo = async (object) => {
  const cityDetails = document.querySelector(".city-details");
  const todayForecast = document.querySelector(".today-forecast");
  const pictureURL = await getCityPicture(object.city.name);
  console.log(pictureURL);
  if (pictureURL) {
    cityDetails.style.backgroundImage = `url(${pictureURL})`;
  }
  cityDetails.innerHTML = `
  <p class="city"><span class="city-name">${object.city.name}</span>, ${object.city.country}</p>
  `;
  todayForecast.innerHTML = generateCardContent(object.list[0]);
};

const showForecasts = (results) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";
  let i = 8;
  while (i < 40) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = generateCardContent(results[i]);
    cardsContainer.appendChild(newCard);
    i = i + 8;
  }
};

export { showCityInfo, showForecasts };
