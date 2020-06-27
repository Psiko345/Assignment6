//link weather api
const apiKey = "9b35e8a2fe8231a262c8c2468f7793c7";

function getWeather(cityName) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#currentCityName").text(cityName);
    $("#temp").text("Temperature: " + response.main.temp);
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#wind").text("Wind Speed: " + response.wind.speed + "km/h");
    //$("#uv").text();
  });

  handleCurrentCityNameChange();
}

function getUVIndex(cityName) {
  let queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat={lat}&lon={lon}`;
}

window.onload = function () {
  getWeather("Sydney");
};

//click listener on search button
$("#searchBtn").on("click", function () {
  console.log($("#citySearchBox").val());
  let cityName = $("#citySearchBox").val();
  getWeather(cityName);
});
//buttonpress listener on search bar
$("#citySearchBox").on("keypress", function (e) {
  if (e.which == 13) {
    console.log($("#citySearchBox").val());
    let cityName = $("#citySearchBox").val();
    getWeather(cityName);
  }
});
//pull text from search bar - place in getWeather
/* let cityName = $("#citySearchBox").val(); getWeather(cityName);*/

//send cityName to proper html ID and append
function handleCurrentCityNameChange() {
  let cityName = $("#citySearchBox").val();
  $("#currentCityName").text(cityName);
  console.log($("#currentCityName").val());
  return;
}
//send weather to HTML -- just do it in 'getweather'

// Generate 5-day forcast

//create HTML with jquery

//ajax call the forecast using same city name

//send data

//save seach to localstorage, prepend last name to list of preivous
