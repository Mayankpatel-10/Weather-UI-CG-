const weatherData = {
    mumbai: {
        location: "Mumbai, Maharashtra",
        temp: 32,
        condition: "Thunderstorms",
        icon: "⛈️",
        realFeel: 38,
        aqi: { value: "Moderate (78)", class: "aqi-moderate" },
        details: {
            humidity: "89%",
            windSpeed: "18 km/h",
            sunrise: "6:12 AM",
            sunset: "7:26 PM"
        }
    },
    delhi: {
        location: "New Delhi, Delhi",
        temp: 42,
        condition: "Partly Cloudy",
        icon: "🌤️",
        realFeel: 47,
        aqi: { value: "Poor (156)", class: "aqi-poor" },
        details: {
            humidity: "42%",
            windSpeed: "12 km/h",
            sunrise: "5:24 AM",
            sunset: "7:18 PM"
        }
    },
    bangalore: {
        location: "Bengaluru, Karnataka",
        temp: 28,
        condition: "Pleasant",
        icon: "🌤️",
        realFeel: 30,
        aqi: { value: "Good (38)", class: "aqi-good" },
        details: {
            humidity: "65%",
            windSpeed: "8 km/h",
            sunrise: "6:05 AM",
            sunset: "6:42 PM"
        }
    },
    hyderabad: {
        location: "Hyderabad, Telangana",
        temp: 38,
        condition: "Sunny",
        icon: "☀️",
        realFeel: 42,
        aqi: { value: "Moderate (85)", class: "aqi-moderate" },
        details: {
            humidity: "51%",
            windSpeed: "15 km/h",
            sunrise: "5:52 AM",
            sunset: "6:48 PM"
        }
    },
    chennai: {
        location: "Chennai, Tamil Nadu",
        temp: 35,
        condition: "Hot & Humid",
        icon: "🌞",
        realFeel: 41,
        aqi: { value: "Moderate (72)", class: "aqi-moderate" },
        details: {
            humidity: "78%",
            windSpeed: "22 km/h",
            sunrise: "5:56 AM",
            sunset: "6:32 PM"
        }
    },
    kolkata: {
        location: "Kolkata, West Bengal",
        temp: 36,
        condition: "Humid",
        icon: "🌫️",
        realFeel: 43,
        aqi: { value: "Poor (145)", class: "aqi-poor" },
        details: {
            humidity: "85%",
            windSpeed: "8 km/h",
            sunrise: "5:05 AM",
            sunset: "6:15 PM"
        }
    },
    pune: {
        location: "Pune, Maharashtra",
        temp: 34,
        condition: "Partly Cloudy",
        icon: "⛅",
        realFeel: 37,
        aqi: { value: "Moderate (68)", class: "aqi-moderate" },
        details: {
            humidity: "58%",
            windSpeed: "14 km/h",
            sunrise: "6:10 AM",
            sunset: "7:05 PM"
        }
    },
    ahmedabad: {
        location: "Ahmedabad, Gujarat",
        temp: 41,
        condition: "Very Hot",
        icon: "🔥",
        realFeel: 46,
        aqi: { value: "Poor (132)", class: "aqi-poor" },
        details: {
            humidity: "35%",
            windSpeed: "16 km/h",
            sunrise: "6:25 AM",
            sunset: "7:15 PM"
        }
    },
    jaipur: {
        location: "Jaipur, Rajasthan",
        temp: 44,
        condition: "Extremely Hot",
        icon: "🔥",
        realFeel: 49,
        aqi: { value: "Poor (124)", class: "aqi-poor" },
        details: {
            humidity: "28%",
            windSpeed: "19 km/h",
            sunrise: "5:32 AM",
            sunset: "7:22 PM"
        }
    },
    lucknow: {
        location: "Lucknow, Uttar Pradesh",
        temp: 40,
        condition: "Hot",
        icon: "☀️",
        realFeel: 45,
        aqi: { value: "Poor (138)", class: "aqi-poor" },
        details: {
            humidity: "48%",
            windSpeed: "11 km/h",
            sunrise: "5:28 AM",
            sunset: "7:12 PM"
        }
    }
};

// Update time
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    document.getElementById('current-time').textContent = now.toLocaleDateString('en-US', options);
}

// Toggle details section
function toggleDetails() {
    const detailsContent = document.getElementById('details-content');
    const expandIcon = document.getElementById('expand-icon');
    
    detailsContent.classList.toggle('expanded');
    expandIcon.textContent = detailsContent.classList.contains('expanded') ? '▲' : '▼';
}

// Update weather data when location changes
function updateWeatherData(cityKey) {
    const data = weatherData[cityKey];
    if (!data) return;
    
    document.getElementById('current-location').textContent = data.location;
    document.getElementById('main-weather-icon').textContent = data.icon;
    document.getElementById('main-temperature').textContent = data.temp + '°';
    document.getElementById('main-condition').textContent = data.condition;
    document.getElementById('real-feel').textContent = `Feels like ${data.realFeel}°`;
    
    const aqiElement = document.getElementById('aqi-value');
    aqiElement.textContent = data.aqi.value;
    aqiElement.className = 'aqi-value ' + data.aqi.class;
    
    // Update details
    document.querySelector('#details-grid [class*="humidity"] + .detail-value').textContent = data.details.humidity;
    document.querySelector('#details-grid [class*="wind"] + .detail-value').textContent = data.details.windSpeed;
    document.querySelector('#details-grid [class*="sunrise"] + .detail-value').textContent = data.details.sunrise;
    document.querySelector('#details-grid [class*="sunset"] + .detail-value').textContent = data.details.sunset;
    
    // Change background based on weather condition
    const weatherCondition = data.condition;
    const body = document.body;
    
    // Remove all weather background classes
    body.className = '';
    body.classList.add('bg-default'); // Add default as fallback
    
    // Find matching background class
    for (const [key, value] of Object.entries(weatherBackgrounds)) {
        if (weatherCondition.includes(key)) {
            body.classList.add(`bg-${value}`);
            break;
        }
    }
    
    // Special case for night time
    const now = new Date();
    const hours = now.getHours();
    if (hours < 6 || hours > 18) { // Between 6PM and 6AM
        body.classList.add('bg-night');
    }
}

// Update background based on weather condition and time
function updateBackground(weatherCondition, time) {
    const container = document.querySelector('.container');
    const hour = parseInt(time.split(':')[0]);
    const isNight = hour >= 19 || hour <= 5;

    // Remove all existing weather background classes
    container.classList.remove(
        'weather-bg-sunny',
        'weather-bg-cloudy',
        'weather-bg-rainy',
        'weather-bg-thunderstorm',
        'weather-bg-night'
    );

    // If it's night time, show night background regardless of weather
    if (isNight) {
        container.classList.add('weather-bg-night');
        return;
    }

    // Add appropriate background based on weather condition
    if (weatherCondition.includes('Sunny') || weatherCondition.includes('Hot')) {
        container.classList.add('weather-bg-sunny');
    } else if (weatherCondition.includes('Cloud') || weatherCondition.includes('Partly')) {
        container.classList.add('weather-bg-cloudy');
    } else if (weatherCondition.includes('Rain')) {
        container.classList.add('weather-bg-rainy');
    } else if (weatherCondition.includes('Thunder')) {
        container.classList.add('weather-bg-thunderstorm');
    }
}

// Call this function whenever you update the weather
// Example usage:
// updateBackground('Sunny', '14:00');

// Initialize the app
function init() {
    updateTime();
    setInterval(updateTime, 60000); // Update time every minute
    
    // Set up location selector
    const locationSelector = document.getElementById('location-selector');
    locationSelector.addEventListener('change', (e) => {
        updateWeatherData(e.target.value);
    });
    
    // Initialize with Delhi data
    updateWeatherData('delhi');
}

// Run the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);