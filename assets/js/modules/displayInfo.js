import { formatDate } from "./formatDate.js";
import { getCityPicture } from "./fetch.js";

let minMaxTable;

const generateCardContent = (obj) => {
  let minMaxObj;
  const date = formatDate(obj.dt_txt);
  for (let item of minMaxTable) {
    if (item.day === date) {
      minMaxObj = item;
    }
  }
  let weatherIconPath = obj.weather[0].icon;
  if (weatherIconPath.includes("n")) {
    weatherIconPath = weatherIconPath.replace("n", "d");
  }
  let content = `
    <p class="date">${date}</p>
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${weatherIconPath}@2x.png">
    <p class="temperatures">
    <span class="min"><span>Min</span>${minMaxObj.min.toFixed(1)}° C</span>
    <span class="max"><span>Max</span>${minMaxObj.max.toFixed(1)}° C</span>
    </p>
    <div class="additional-info">
      <p class="humidity"><img src="./assets/images/humidity.svg"> ${
        obj.main.humidity
      } %</p>
      <p class="wind"><img src="./assets/images/wind.svg"> ${
        obj.wind.speed
      } m/s</p>
    </div>
    `;
  return content;
};

const showCityInfo = async (object) => {
  const cityDetails = document.querySelector(".city-details");
  const todayForecast = document.querySelector(".today-forecast");
  const pictureURL = await getCityPicture(object.city.name);
  if (pictureURL) {
    cityDetails.style.backgroundImage = `url(${pictureURL})`;
  } else {
    cityDetails.style.backgroundImage = `./assets/images/1189.jpg`;
  }
  cityDetails.innerHTML = `
  <p class="city"><span class="city-name">${object.city.name}</span>, ${object.city.country}</p>
  `;
  todayForecast.innerHTML = generateCardContent(object.list[0]);
};

const showForecasts = (results) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";
  minMaxTable = displayMinMaxTemp(results);
  let i = 8;
  while (i < 40) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = generateCardContent(results[i], minMaxTable);
    cardsContainer.appendChild(newCard);
    i = i + 8;
  }
};

// Returns a table of objects of days with min and max temperatures
const displayMinMaxTemp = (results) => {
  let currentDay = formatDate(results[0].dt_txt);
  let temperatures = [];
  let temp = [];
  for (let i = 0; i < results.length; i++) {
    let day = new Date(results[i].dt_txt);
    day = formatDate(day);
    if (currentDay !== day) {
      temperatures.push({
        day: currentDay,
        min: Math.min(...temp),
        max: Math.max(...temp),
      });
      currentDay = day;
      temp = [];
      temp.push(results[i].main.temp);
    } else {
      temp.push(results[i].main.temp);
    }
  }
  return temperatures;
};

export { showCityInfo, showForecasts, minMaxTable };
