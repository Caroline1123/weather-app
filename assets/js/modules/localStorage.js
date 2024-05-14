const saveCityToStorage = (city) => {
  localStorage.setItem("city", city);
};

const loadCityFromStorage = () => {
  let city = localStorage.getItem("city") || "";
  return city;
};

export { saveCityToStorage, loadCityFromStorage };
