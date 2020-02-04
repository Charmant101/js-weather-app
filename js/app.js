
// selection of elements for the manipulation of the dom
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


// weather data 


// weather is initially set to an empty object
const weather = {};

// initial weather temperature is set to celsius

weather.temperature = {
    unit: "celsius"
}


// APP CONSTANTS AND VARS 

const kelvin = 273;
const key = "27d50d2f094f6717fe34de0c58eef3cb";


const setPosition= (position)=> {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);

}
// this is a code block used to check if your browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser does not support Geolocation.</p>";
}

// this is a function used to set the present location of the user of the app.


// this is a function which shows the error message incase there is an issue bar the absence of a geolocation support within the browser
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message} </p>`;
}

// a function call that makes an api call to the weather api and returns the information to the user via the user interface
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        }).
        then(function () {
            displayWeather();
        })
}




// a simple function when called will change the weather by altering the inner html amd displays the weather to the user;


function displayWeather() {


    //

    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}


// function that converts temperature from celsius to fahrenheit


function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}



// event listeners used to convert temperature from celsius to fahrenheit when triggered by clicking on the temperature element


tempElement.addEventListener("click", function () {
    // this basically says if there is no value passed in,it naturally gives an undefined value and if so,it returns without running the code underneath
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit == "celsius") {
        // here you define a variable called fahrenheit and when done you call the celsiustoFahrenheit function with the weather.temperature.value of the api being passed as the argument in the function and when the result is gotten we then use the math.floor method to convert it into a whole number
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        // the inner html of our temp Element would be changed to the fahrenheit value
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`

        // it means that the weather temperature unit from our desired api is named as fahrenheit instead of celsius
        weather.temperature.unit = "fahrenheit"
    }
    else {
        // in the else block it will give the default value calculated in celsius with the weather.temperature.unit value being in celsius
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
        weather.temperature.unit = "celsius";
    }
})




