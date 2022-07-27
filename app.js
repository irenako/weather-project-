// Day and time changer
function changeTime(date) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let day = now.getDay();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  return ` ${currentDay}, ${hour}:${minutes}`;
}
let day = document.querySelector("#currentDayTime");
let now = new Date();
currentDayTime.innerHTML = changeTime();

// City changer
function searchCity(city) {
  let apiKey = "767ddeb46b487f530efd1ae17c8208f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Current position
let buttonCurLoc = document.querySelector("#btn2");
buttonCurLoc.addEventListener("click", getLocation);
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let apiKey = "767ddeb46b487f530efd1ae17c8208f9";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }
}
function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#currenttemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//Temperature convert
let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", convertToFahr);

function convertToFahr(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currenttemp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  temperature = Number(temperature);
}

let tempC = document.querySelector("#celcius");
tempC.addEventListener("click", convertToCelc);
function convertToCelc(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currenttemp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

searchCity("Kyiv");

/// Change icons
