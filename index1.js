const weather = {
  apiKey: "ad75c2d31a1936d01649d74ff5ccff12",

  async fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
      alert("Failed to retrieve weather data. Please check the city name.");
    }
  },

  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    const $ = (selector) => document.querySelector(selector);

    $(".city").innerText = `Weather in ${name}`;
    $(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    $(".description").innerText = description;
    $(".temp").innerText = `${temp}°C`;
    $(".humidity").innerText = `Humidity: ${humidity}%`;
    $(".wind").innerText = `Wind speed: ${speed} km/h`;
    $(".weather").classList.remove("loading");

    document.body.style.backgroundImage = 
      `url('https://source.unsplash.com/1600x900/?${name}')`;
  },

  search() {
    const city = document.querySelector(".search-bar").value.trim();
    if (city) this.fetchWeather(city);
  }
};

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key === "Enter") weather.search();
});

// Default weather on page load
weather.fetchWeather("Kolkata");
