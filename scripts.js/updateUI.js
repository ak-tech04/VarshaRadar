const temp = document.querySelector(".weather-number");
const tempDesc = document.querySelector(".normal-text");
const currentDate = document.querySelector(".currentDate");
const currentTime = document.querySelector(".currentTime");
const currentDay = document.querySelector(".currentDay");
const currentLocation = document.querySelector(".current-location");
const weatherImg = document.querySelector(".weather-icon");
// Adding weather icon based on weather id
function addWeatherIcon(id, code) {
  console.log("icon id : ", id, "weather code : ", code);
  const iconURL = `https://openweathermap.org/img/wn/${id}@2x.png`;
  weatherImg.src = iconURL;
}
// Function to update Temp and Weather Description
function updateTemp(num, desc) {
  const weatherDesc = desc
    .split(" ")
    .map((element) => {
      let word = element.charAt(0).toUpperCase() + element.slice(1);
      return word;
    })
    .join(" ");
  const weatherNum = num;
  temp.innerHTML = `${weatherNum}&degC`;
  tempDesc.innerHTML = `${weatherDesc}`;
}

let timeIntervalId = null;
// Update Time
function updateTime(timeZone) {
  // Month names and days
  currTimeZone = timeZone;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Extract UTC components
  if (timeIntervalId === null) {
    timeIntervalId = setInterval(
      settingDate,
      1000,
      months,
      weekdays,
      currTimeZone
    );
  } else {
    clearInterval(timeIntervalId);
    timeIntervalId = null;
    timeIntervalId = setInterval(
      settingDate,
      1000,
      months,
      weekdays,
      currTimeZone
    );
  }
}

function settingDate(months, weekdays, timeZone) {
  let epochTime = new Date().getTime();
  let myTime = epochTime + timeZone * 1000;
  let date = new Date(myTime);

  let day = date.getUTCDate();
  let month = months[date.getUTCMonth()];
  let year = date.getUTCFullYear();
  let weekday = weekdays[date.getUTCDay()];

  // Format hours and minutes
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let ampm = hour >= 12 ? "PM" : "AM";
  // let hour12 = hour % 12;
  // if (hour12 === 0) hour12 = 12;
  minute = minute.toString().padStart(2, "0");
  let second = date.getUTCSeconds().toString().padStart(2, "0");

  // Build the output
  let line1 = `${day} ${month} ${year}`;
  let line2 = `${weekday}, ${hour}:${minute}:${second} ${ampm}`;
  let line3 = "Day";

  currentDate.innerHTML = `${line1}`;
  currentTime.innerHTML = `${line2}`;
  currentDay.innerHTML = `${line3}`;
  // console.log(line2);
}

function updateLocation(city, state, country) {
  let countryName = new Intl.DisplayNames(["en"], { type: "region" });
  let displayCountryName = countryName.of(country);
  currentLocation.innerHTML = `${city}, ${state}, ${displayCountryName}`;
}
