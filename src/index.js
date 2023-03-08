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
function displayWeatherCondition(response) {
  let tem = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = `${tem} °C`;
  document.querySelector("#city").innerHTML = response.data.name;
  let hum = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = `${hum}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `${wind} km/h`;
}

function changeCity(event) {
  event.preventDefault();
  let citygiven = document.querySelector("#city");
  let city = document.querySelector("#city-input").value;
  citygiven.innerHTML = city.value;
  searchCity(city);
}

let buttonCurrent = document.querySelector(".button-current");
buttonCurrent.addEventListener("click", getLocation);

let searchf = document.querySelector(".button-search");
searchf.addEventListener("click", changeCity);

let now = new Date();
let day = document.querySelector("#day");
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
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
day.innerHTML = `${weekday} ${hours}:${minutes}`;
searchCity("London");
