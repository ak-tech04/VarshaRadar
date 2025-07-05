const rightPanel = document.querySelector(".right-side");

const windSpeed = document.querySelector(".data-wind");
const humidity = document.querySelector(".data-humidity");
const realFealTemp = document.querySelector(".data-realFeal");
const pressure = document.querySelector(".data-pressure");
const chancesOfRain = document.querySelector(".data-rain");
const minTemp = document.querySelector(".data-tempMin");
const maxTemp = document.querySelector(".data-tempMax");

function updateMetricsData(weatherData) {
  const data = {
    Wind: weatherData.windSpeed,
    Humidity: weatherData.mainHumidity,
    "Real Feal": weatherData.mainFeelsLike,
    Pressure: weatherData.mainPressure,
    // Visibility: weatherData.visibility,
    "Chances of Rain": weatherData.rain,
    "Min and Max": {
      Min: weatherData.mainTempMin,
      Max: weatherData.mainTempMax,
    },
  };
  const degree = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "celsius",
  });

  const blank = "-";
  console.log("metrics data ", data);
  windSpeed.innerHTML = `${data["Wind"]} km/h`;
  humidity.innerHTML = `${data["Humidity"]}%`;
  realFealTemp.innerHTML = `${degree.format(data["Real Feal"])}`;
  pressure.innerHTML = `${data["pressure"]}mbbar`;
  if (data["pressure"] === undefined) {
    pressure.innerHTML = `${blank}`;
  }
  chancesOfRain.innerHTML = `${data["Chances of Rain"]}%`;
  if (data["Chances of Rain"] === undefined) {
    chancesOfRain.innerHTML = `${blank}`;
  }
  minTemp.innerHTML = `Min: ${degree.format(data["Min and Max"]["Min"])}`;
  maxTemp.innerHTML = `Max: ${degree.format(data["Min and Max"]["Max"])}`;
}
function modalWindowAlert(message, signal) {
  console.log("modal windonw tirggerd");
  // const modalDiv = document.createElement("div");
  // console.log("created modaldiv");
  // modalDiv.classList.add("modal");
  // modalDiv.classList.add("modal-content");

  // console.log('added modal class');
  // modalDiv.innerHTML = message;
  // console.log('added message');
  // document.body.appendChild(modalDiv);
  // console.log('apped');
}
