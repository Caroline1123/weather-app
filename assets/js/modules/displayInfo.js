import { formatDate } from "./formatDate.js";

const generateCardContent = (obj) => {
  const date = formatDate(obj.dt_txt);
  let weatherIconPath = obj.weather[0].icon;
  if (weatherIconPath.includes("n")) {
    weatherIconPath = weatherIconPath.replace("n", "d");
  }
  let content = `
    <img src="https://openweathermap.org/img/wn/${weatherIconPath}@2x.png">
    <p class="date">${date}</p>
    <p class="temperature">${obj.main.temp.toFixed(1)}° C</p>
    <p class="humidity">Humidity: ${obj.main.humidity} %</p>
    <p class="wind">Wind: ${obj.wind.speed} km/h</p>
    `;
  return content;
};

const showCityInfo = (object) => {
  const cityInfo = document.querySelector(".city-info");
  cityInfo.innerHTML = `
  <p class="city"><span class="city-name">${object.city.name}</span>, ${object.city.country}</p>
  `;
  cityInfo.innerHTML += generateCardContent(object.list[0]);
};

const showForecasts = (results) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";
  let i = 8;
  while (i < 40) {
    const newCard = document.createElement("div");
    newCard.innerHTML = generateCardContent(results[i]);
    cardsContainer.appendChild(newCard);
    i = i + 8;
  }
};

export { showCityInfo, showForecasts };
