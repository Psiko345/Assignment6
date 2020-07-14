//link weather api
const apiKey = "9b35e8a2fe8231a262c8c2468f7793c7";

function getWeather(cityName) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#temp").text(
      "Temperature: " + temperatureForDisplay(response.main.temp) + " °C"
    );
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#wind").text("Wind Speed: " + response.wind.speed + "km/h");
    $("#currentCityWeatherIcon").attr(
      "src",
      `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    );
    let cityId = response.id;

    getForecast(cityId);
    getUVIndex(response.coord.lat, response.coord.lon);
  });
}

function temperatureForDisplay(temp) {
  return Math.trunc(temp - 272.15);
}

function getUVIndex(lat, lon) {
  let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#uv").text("UV Index: " + response.value);
  });
}

function getForecast(cityId) {
  let queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    let fiveDays = selectDailyForcast(response.list);
    let parent = $("#forcastTiles");
    parent.empty();
    fiveDays.forEach(function (element) {
      generateTile(parent, element);
    });
  });
}

function selectDailyForcast(forecasts) {
  dailyForecasts = [];
  forecasts.forEach(function (element) {
    let when = moment(element.dt_txt);
    if (when.hour() == 12) {
      dailyForecasts.push(element);
    }
  });
  return dailyForecasts;
}

function generateTile(parent, oneDayForecast) {
  parent.append(
    $(`<div class="card forecastTile">
    <div class="card-body">
        <h5 class="card-title">${oneDayForecast.dt_txt}</h5>
        <img src="https://openweathermap.org/img/wn/${
          oneDayForecast.weather[0].icon
        }@2x.png"></img>
        <p>Temp: ${temperatureForDisplay(oneDayForecast.main.temp)} &#8451;</p>
        <p>Humidity: ${oneDayForecast.main.humidity}% </p>
    </div>
</div>`)
  );
}

window.onload = function () {
  let lastCity = localStorage.getItem("lastCity");
  if (lastCity == null) {
    lastCity = "Sydney";
  }
  handleCityChange(lastCity);
  restorePreviousCities();
};

function restorePreviousCities() {
  let previousCitiesAsString = localStorage.getItem("previousCities");
  let previousCities = JSON.parse(previousCitiesAsString);
  let parent = $("#previousSearches");
  if (previousCitiesAsString != null) {
    parent.empty();
    previousCities.forEach((element) => {
      parent.append($(`<li class="list-group-item">${element}</li>`));
    });
  }
}

function saveToPreviousCities(newCity) {
  let previousCitiesAsString = localStorage.getItem("previousCities");
  let previousCities = JSON.parse(previousCitiesAsString);
  if (previousCities == null) {
    previousCities = [];
  }
  previousCities.push(newCity);
  previousCities = new Set(previousCities);
  previousCities = Array.from(previousCities);
  localStorage.setItem("previousCities", JSON.stringify(previousCities));
}

function handleCityChange(newCity) {
  $("#currentCityName").text(
    newCity + " (" + (moment().format("YYYY MM DD") + ")")
  );
  getWeather(newCity);
  saveToPreviousCities(newCity);
  restorePreviousCities();
  localStorage.setItem("lastCity", newCity);
}

//click listener on search button
$("#searchBtn").on("click", function () {
  console.log($("#citySearchBox").val());
  let cityName = $("#citySearchBox").val();
  handleCityChange(cityName);
});

//buttonpress listener on search bar
$("#citySearchBox").on("keypress", function (e) {
  if (e.which == 13) {
    console.log($("#citySearchBox").val());
    let cityName = $("#citySearchBox").val();
    handleCityChange(cityName);
  }
});

$("#previousSearches").on("click", function (e) {
  console.log("CLICKED:");
  console.log(e);
  handleCityChange(e.target.textContent);
});

//pull text from search bar - place in getWeather
/* let cityName = $("#citySearchBox").val(); getWeather(cityName);*/

//send weather to HTML -- just do it in 'getweather'

// Generate 5-day forcast

//create HTML with jquery

//ajax call the forecast using same city name

//send data

//save seach to localstorage, prepend last name to list of preivous
