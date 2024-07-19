// Import the CSS file for styling
import './style.css';

// Declare a variable with the API URL inside
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-33.9258&longitude=18.4232&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto";

// Weather interpretation codes mapping
const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight intensity",
  81: "Rain showers: Moderate intensity",
  82: "Rain showers: Violent intensity",
  85: "Snow showers: Slight intensity",
  86: "Snow showers: Heavy intensity",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

// Fetch the weather data from the API
fetch(apiUrl)
  .then(response => {
    // Check if the response status is OK
    if (!response.ok) {
      // Throw an error if the response is not OK
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON from the response and return it
    return response.json();
  })
  .then(data => {
    // Extract the daily weather data from the response
    const dailyTimes = data.daily.time; // Array of date strings for each day
    const dailyMaxTemperatures = data.daily.temperature_2m_max; // Array of max temperatures for each day
    const dailyMinTemperatures = data.daily.temperature_2m_min; // Array of min temperatures for each day
    const dailyPrecipitation = data.daily.precipitation_sum; // Array of total precipitation for each day
    const dailyMaxWindSpeeds = data.daily.windspeed_10m_max; // Array of max wind speeds for each day
    const dailyWeatherCodes = data.daily.weathercode; // Array of weather interpretation codes for each day

    // Get the element to display the daily weather data
    const dailyWeatherList = document.getElementById('daily-weather');
    dailyWeatherList.innerHTML = ''; // Clear any existing data in the list

    // Loop through each day and create a list item for the weather data
    dailyTimes.forEach((time, index) => {
      const listItem = document.createElement('li'); // Create a new list item element
      const date = new Date(time); // Convert the date string to a Date object
      const dayString = date.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week as a string
      const weatherDescription = weatherDescriptions[dailyWeatherCodes[index]]; // Get the weather description based on the code

      listItem.innerHTML = `
        <p>Date: ${dayString}, ${date.toLocaleDateString()}</p> <!-- Format the date string to a readable date -->
        <p>Max Temperature: ${dailyMaxTemperatures[index]} °C</p> <!-- Display the max temperature -->
        <p>Min Temperature: ${dailyMinTemperatures[index]} °C</p> <!-- Display the min temperature -->
        <p>Precipitation: ${dailyPrecipitation[index]} mm</p> <!-- Display the total precipitation -->
        <p>Max Wind Speed: ${dailyMaxWindSpeeds[index]} km/h</p> <!-- Display the max wind speed -->
        <p>Weather: ${weatherDescription}</p> <!-- Display the weather description -->
        <hr> <!-- Add a horizontal line to separate each day's data -->
      `;
      dailyWeatherList.appendChild(listItem); // Append the list item to the daily weather list
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch or processing
    console.error("There was an error fetching the weather data:", error);
  });

let isDark = true; // Initialize a boolean variable to keep track of the theme state

// Get the button element by its ID and add an event listener for the 'click' event
document.getElementById("theme-toggle-button").addEventListener('click', function() {
  // Check if the current theme is dark
  if (isDark) {
    // Switch to light mode
    document.body.style.backgroundColor = "#ffffff"; // Set the background color to white
    document.getElementById('topBar').style.color = "black"; // Set the text color of the top bar to black
    document.getElementById('app').style.color = 'black';
    document.getElementById('app').style.background = 'url(https://tse4.mm.bing.net/th?id=OIP.nvIJrJg8vRTQi3QTaOEFUwHaE8&pid=Api&P=0&h=220)';
    document.getElementById('app').style.backgroundSize = 'cover' // Set a light linear gradient background
    isDark = false; // Update the theme state to light
  } else {
    // Switch to dark mode
    document.body.style.backgroundColor = "black"; // Set the background color to black
    document.getElementById('topBar').style.color = "#ffffff"; // Set the text color of the top bar to white
    document.getElementById('app').style.color = '#ffffff';
    document.getElementById('app').style.background = 'url(https://tse1.mm.bing.net/th?id=OIP.RJaUCDf-WTo03pWhfVdezQHaJQ&pid=Api&P=0&h=220)'; // Set a dark linear gradient background
    document.getElementById('app').style.backgroundSize = 'cover';
    isDark = true; // Update the theme state to dark
  }
});
