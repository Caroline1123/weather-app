import { formatDate } from "./formatDate.js";

let minMaxTable;

const generateCardContent = (obj) => {
  let minMaxObj;
  const date = formatDate(obj.dt_txt);
  for (let item of minMaxTable) {
    if (item.day === date) {
      minMaxObj = item;
      break;
    }
  }
  let weatherIconPath = obj.weather[0].icon.replace("n", "d");
  let content = `
  <p class="date">${date}</p>
  <img class="weather-icon" src="https://openweathermap.org/img/wn/${weatherIconPath}@2x.png" alt="weather icon">
  <p class="temperatures">
    <span class="min"><span>Min</span>${minMaxObj.min.toFixed(1)}° C</span>
    <span class="max"><span>Max</span>${minMaxObj.max.toFixed(1)}° C</span>
    </p>
    <div class="additional-info">
      <p class="humidity"><img src="./assets/images/humidity.svg" alt="humidity"> ${
        obj.main.humidity
      } %</p>
      <p class="wind"><img src="./assets/images/wind.svg" alt="wind"> ${
        obj.wind.speed
      } m/s</p>
    </div>
    `;
  return content;
};

const showCityInfo = async (object, pictureLink) => {
  const cityDetails = document.querySelector(".city-details");
  const todayForecast = document.querySelector(".today-forecast");
  if (pictureLink !== null) {
    cityDetails.style.backgroundImage = `url(${pictureLink})`;
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
  minMaxTable = getMinMaxTemp(results);
  for (let i = 8; i < results.length; i = i+8) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = generateCardContent(results[i], minMaxTable);
    cardsContainer.appendChild(newCard);
  }
};

// Returns a table of objects with min and max temperatures for each day
const getMinMaxTemp = (results) => {
  let currentDay = formatDate(results[0].dt_txt);
  let temperatures = [];
  let temp = [];
  for (let i = 0; i < results.length; i++) {
    let day = new Date(results[i].dt_txt);
    day = formatDate(day);
    if (currentDay !== day || i == results.length -1 ) {
      temperatures.push({
        day: currentDay,
        min: Math.min(...temp),
        max: Math.max(...temp),
      });
      currentDay = day;
      temp = [];
    }
    temp.push(results[i].main.temp);
  }
  return temperatures;
};

export { showCityInfo, showForecasts };
