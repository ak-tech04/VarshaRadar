// import MY_API_KEY from api_key.js
const form = document.querySelector("form");
const userInput = document.querySelector("#city-name");
const defaultLocation = "delhi";
async function apiKey() {
  const key = process.env.api_key;
  return key;
}
const API_KEY = apiKey(); // ADD YOUR API KEY HERE
const weatherTemp = document.querySelector(".weather-temp");
const dateContainer = document.querySelector(".date-info");
mainFunction();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchInput = userInput.value;
  userInput.value = "";
  // VALIDATING INPUT FIEDS
  if (searchInput.trim() === "") {
    console.log("Empty string");
  } else {
    try {
      const userLocation = searchInput.toLowerCase();
      searchLocation(userLocation);
    } catch (error) {
      if (error.message === "City not found") {
        console.log(error);
      }
    }
  }
});

// Main function
function mainFunction() {
  // Access users gps location

  if ("geolocation" in navigator) {
    console.log("Geolocationn feature is present");
    navigator.geolocation.getCurrentPosition(sucess, error);
  } else {
    console.log("Geoloaction not present");
    console.log("Loading Default location");
    defaultLocation();
  }
}
async function sucess(position) {
  console.log("Accessing gps coodinates");
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const weatherData = await getWeatherData(lat, lon);
  displayData(weatherData, lat, lon);
  console.log("storing gps coodinates in local storage");
  localStorage.setItem("userLocation", true);
  localStorage.setItem("lat", lat);
  localStorage.setItem("lon", lon);
}

async function error() {
  console.log("User gps denied");
  // Load previous location in local Storage
  if (localStorage.getItem("userLocation") === true) {
    console.log("Loading gps coods from local storage");
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");
    console.log(lat, lon);
    const weatherData = await getWeatherData(lat, lon);
    displayData(weatherData, lat, lon);
    // displayLocation(lat, lon);
  } else {
    // loading default location

    console.log("loading default location");
    loadDefaultLocation();
  }
}
async function loadDefaultLocation() {
  console.log("default - delhi");
  const coordinates = await getCoordinates(defaultLocation);
  const lat = coordinates[0];
  const lon = coordinates[1];
  const weatherData = await getWeatherData(lat, lon);
  displayData(weatherData, lat, lon);
  const message = "Loading Default Location Delhi.....";
  const signal = "red";
  modalWindowAlert(message, signal);

  // displayLocation(lat, lon);
  //  Load popup modal window alert showing default location
}
function displayData(weatherData, lat, lon) {
  console.log("displayData called");
  const weatherNum = weatherData.mainTemp;
  const weatherDesc = weatherData.weatherDesc;
  const weatherIconId = weatherData.weatherIcon;
  const weatherCode = weatherData.weatherCode;
  // left side panel rendering data
  addWeatherIcon(weatherIconId, weatherCode);
  updateTemp(weatherNum, weatherDesc);
  const timeZone = weatherData.timezone;
  updateTime(timeZone);
  displayLocation(lat, lon);

  updateMetricsData(weatherData);
}
async function displayLocation(lat, lon) {
  console.log("displaylocation called");
  const limit = 1;
  try {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const cityName = data[0].name;
    const stateName = data[0]?.state;

    const countryName = data[0].country;
    // console.log(cityName, stateName, countryName);
    updateLocation(cityName, stateName, countryName);
  } catch (e) {
    console.log(e, "display location error");
  }
}

//   ADD A CHECK PARAMETER FOR CHECKING api Fields are commming or not
async function getCoordinates(userLocation) {
  let city = userLocation;
  let limit = 1;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`;
  //   let state = null;
  //   let country = null;
  try {
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data);
    if (data.length === 0) {
      // display modal popup
      throw new Error("City not found");
    } else {
      let ary = [
        data[0].lat,
        data[0].lon,
        data[0].name,
        data[0].state,
        data[0].country,
      ];
      return ary;
    }
  } catch (error) {
    throw error;
  }
}

async function getWeatherData(lat, lon) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(URL);
  const data = await res.json();
  // console.log(data);
  //   const spreadData = {...data}
  //   return spreadData;
  const cityName = data?.name;
  const timezone = data?.timezone;
  const weatherCode = data?.weather[0].id;
  const weather = data?.weather[0]?.main;
  const weatherDesc = data?.weather[0]?.description;
  const weatherIcon = data?.weather[0]?.icon;
  const mainTemp = data["main"]["temp"];
  const mainFeelsLike = data["main"]["feels_like"];
  const mainTempMin = data["main"]["temp_min"];
  const mainTempMax = data["main"]["temp_max"];
  const mainPressure = data["main"]["pressure"];
  const mainHumidity = data["main"]["humidity"];
  const visibility = data["visibility"];
  const windSpeed = data["wind"]["speed"];
  const rain = data["rain"];
  const clouds = data["clouds"]["all"];
  const weatherObj = {
    name: cityName,
    timezone: timezone,
    lat: lat,
    lon: lon,
    windSpeed: windSpeed,
    rain: rain,
    visibility: visibility,
    mainHumidity: mainHumidity,
    clouds: clouds,
    weatherIcon: weatherIcon,
    weatherCode: weatherCode,
    weather: weather,
    weatherDesc: weatherDesc,
    mainTemp: mainTemp,
    mainFeelsLike: mainFeelsLike,
    mainTempMin: mainTempMin,
    mainTempMax: mainTempMax,
    mainPressure: mainPressure,
  };
  // console.log(weatherObj);

  return weatherObj;
}

async function searchLocation(userLocation) {
  //   Get coordinates
  const coordinates = await getCoordinates(userLocation);
  const lat = coordinates[0];
  const lon = coordinates[1];
  // Get weather data from coordinates
  const weatherData = await getWeatherData(lat, lon);
  // console.log(weatherData);
  const weatherNum = weatherData.mainTemp;
  const weatherDesc = weatherData.weatherDesc;
  const weatherIconId = weatherData.weatherIcon;
  const weatherCode = weatherData.weatherCode;
  console.log(weatherCode, weatherIconId);
  // left side panel rendering data
  addWeatherIcon(weatherIconId, weatherCode);
  updateTemp(weatherNum, weatherDesc);
  const timeZone = weatherData.timezone;
  updateTime(timeZone);
  const cityName = coordinates[2];
  const stateName = coordinates[3];
  const countryName = coordinates[4];
  updateLocation(cityName, stateName, countryName);

  // const metricsData = [weatherData.wind, weatherData.humidity, weatherData.mainFeelsLike, weatherData.]
  updateMetricsData(weatherData);
}
