var latitude;
var longitude;
var api;
var img = new Image();
var output;
//Finds the users location using google API
function geoFindMe() {
     output = document.getElementById("displayMap");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        api = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=d85c2cc4c6ae101477d69b71c2944bd6";

        output.appendChild(img);
        weatherApp();
    }
    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    navigator.geolocation.getCurrentPosition(success, error); //pass the position and error (if any)
}

//Uses open weather API to obtain weather information using the users lat and long
function weatherApp() {
    $.getJSON(api, function (data) {

        var country = data.sys.country;
        $('#country').html(country);

        var city = data.name;
        $('#city').html(city);


        var icon = data.weather[0].icon; //TODO CHOOSE WHAT TYPE OF PIC TO DISPLAY DEPENDING ON ICON
        $('#icon').html(icon);

        var weatherDescription = data.weather[0].description; 
        $('#weatherDescription').html(weatherDescription) //gets temp

        var temprature = data.main.temp;
        $('#temp').html(temprature + '&deg;') //gets temp

        var humidity = data.main.humidity;
        $('#humidity').html(humidity) //gets temp

        var wind = data.wind.speed;
        $('#windSpeed').html(wind) //gets temp
    });

}

