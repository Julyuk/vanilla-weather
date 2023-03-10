function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[now.getDay()];
  return `${weekday} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function goFarenheit(event) {
  event.preventDefault();
  let fahrenheitlink = document.querySelector("#f");
  let celsiuslink = document.querySelector("#c");
  let temperatureElement = document.querySelector("#temp");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheiTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheiTemperature} °F`;
}
function goCelsius(event) {
  event.preventDefault();
  let fahrenheitLink = document.querySelector("#f");
  let celsiusLink = document.querySelector("#c");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  celsiusTemperature = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `${celsiusTemperature} °C`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "215576bab28022db35e6e64f040e1b56";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  axios.get(url).then(displayWeatherCondition);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function searchCity(city) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getForecast(coordinates) {
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temp");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)} °C`;
  document.querySelector("#city").innerHTML = response.data.name;
  let hum = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = `${hum}%`;
  let wind = Math.round(response.data.wind.speed * 3.6);
  document.querySelector("#wind-speed").innerHTML = `${wind} km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dayElement = document.querySelector("#day");
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  getForecast(response.data.coord);
}

function changeCity(event) {
  event.preventDefault();
  let citygivenElement = document.querySelector("#city");
  let city = document.querySelector("#city-input").value;
  citygivenElement.innerHTML = city.value;
  searchCity(city);
}
let celsiusTemperature = null;
let farenheitlink = document.querySelector("#f");
farenheitlink.addEventListener("click", goFarenheit);

let celsiuslink = document.querySelector("#c");
celsiuslink.addEventListener("click", goCelsius);

let buttonCurrent = document.querySelector(".button-current");
buttonCurrent.addEventListener("click", getLocation);

let searchf = document.querySelector(".button-search");
searchf.addEventListener("click", changeCity);

searchCity("Washington");
