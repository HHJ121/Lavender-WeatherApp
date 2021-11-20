function formatCurrentDate(time) {
  let currentDate = new Date(time);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
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
  let day = days[currentDate.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function setDay(time) {
  let setDate = new Date(time * 1000);
  let day = setDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function showForecast(response) {
  let forecasts = response.data.daily;

  let weatherForecast = document.querySelector("#forecast");

  let weatherForecastHTML = `<div class="row">`;

  forecasts.forEach(function (forecastDay, index) {
    if (index < 5) {
      weatherForecastHTML =
        weatherForecastHTML +
        ` <div class="col-2">
                <div class="forecast-date">${setDay(forecastDay.dt)}</div>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="" width="70" />
               
                <div class="forecast-temp" id="forecast-temperature">
                  <span class="forecast-max-temp"><strong id="max-temp">${Math.round(
                    forecastDay.temp.max
                  )}˚</strong></span>/<span class="forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}˚</span>

              </div> 
            </div>`;
    }
  });

  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecast.innerHTML = weatherForecastHTML;
}

function getDailyForecast(coordinates) {
  let apiKey = "c0d5182ce71bc2be9c80f43da3c8ee07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function displayTemperature(response) {
  let currentTemp = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let tempIcon = document.querySelector("#weather-icon");
  let currentDate = document.querySelector("#date");
  let cityName = document.querySelector("#cityName");

  celsiusTemp = response.data.main.temp;
  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  tempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  tempIcon.setAttribute("alt", `response.data.weather[0].description`);
  currentDate.innerHTML = formatCurrentDate(response.data.dt * 1000);

  getDailyForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c0d5182ce71bc2be9c80f43da3c8ee07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function cityInput(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  search(cityName.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemp;
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityInput);

let celsiusTemp = null;

let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", showFahrenheit);

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", showCelsius);

search("Marseille");
showForecast();
