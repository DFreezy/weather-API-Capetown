// Import the CSS file for styling
import './style.css';

// Here I declared a variable with the api url inside
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-33.9258&longitude=18.4232&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto";

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

    // Here I am getting the element to display the daily weather data
    const dailyWeatherList = document.getElementById('daily-weather');
    dailyWeatherList.innerHTML = ''; // Clear any existing data in the list

    // Loop through each day and create a list item for the weather data
    dailyTimes.forEach((time, index) => {
      const listItem = document.createElement('li'); // Create a new list item element
      listItem.innerHTML = `
        <p>Date: ${new Date(time).toLocaleDateString()}</p> <!-- Format the date string to a readable date -->
        <p>Max Temperature: ${dailyMaxTemperatures[index]} °C</p> <!-- Display the max temperature -->
        <p>Min Temperature: ${dailyMinTemperatures[index]} °C</p> <!-- Display the min temperature -->
        <p>Precipitation: ${dailyPrecipitation[index]} mm</p> <!-- Display the total precipitation -->
        <p>Max Wind Speed: ${dailyMaxWindSpeeds[index]} km/h</p> <!-- Display the max wind speed -->
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
    document.getElementById('app').style.backgroundColor = '#ffffff';
    isDark = false; // Update the theme state to light
  } else {
    // Switch to dark mode
    document.body.style.backgroundColor = "black"; // Set the background color to black
    document.getElementById('topBar').style.color = "#ffffff"; // Set the text color of the top bar to white
    document.getElementById('app').style.color = '#ffffff';
    document.getElementById('app').style.backgroundColor = 'black';
    isDark = true; // Update the theme state to dark
  }
});
