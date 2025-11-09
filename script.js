const apiKey = "b15512bcabe9daa111e4a652f65a356f";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("Lahore");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if(city) fetchWeather(city);
    else weatherResult.innerHTML = "<p style='color:red;'>Please enter a city!</p>";
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if(!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`);
}

function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    weatherResult.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${description}</p>
    `;
}

