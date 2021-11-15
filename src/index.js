let now = new Date();
let currentDate = document.querySelector("#currentDate");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();

currentDate.innerHTML = `${day} ${month}.${date} ${hours}:${minutes}`;

function displayWeather(response) {
  document.querySelector("#currentT").innerHTML = `${Math.round(
    response.data.main.temp
  )}˚C`;

  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}˚`;

  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}˚`;
  document.querySelector("#wind-input").innerHTML = `Wind:${Math.round(
    response.data.wind.speed * 3.6
  )} KMPH`;

  document.querySelector(
    "#humidity-input"
  ).innerHTML = `Humidity:${response.data.main.humidity}%`;

  document.querySelector("#city").innerHTML = `${response.data.name}`;
}

function cityName(event) {
  event.preventDefault();
  let input = document.querySelector("#input-city");
  document.querySelector("#city").innerHTML = `${input.value}`;
  let apiKey = "c0d5182ce71bc2be9c80f43da3c8ee07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", cityName);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "c0d5182ce71bc2be9c80f43da3c8ee07";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function currentButton(event) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentButton);
