const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const date = new Date();
const today = date.getDate();
const currentMonth = monthNames[date.getMonth()];

document.querySelector('.date').innerHTML = `${currentMonth} ${today}`;

const getWeather = async () => {
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.81&longitude=96.16&daily=temperature_2m_max&timezone=Asia/Rangoon&current_weather=true");
    const body = await data.json();
    
    const todayWeather = body.daily.temperature_2m_max[0];
    const unit = body.daily_units.temperature_2m_max;
    const weatherCode = body.current_weather.weathercode;
    let iconName = "";
    let text = "";

    switch (weatherCode) {
        case 0:
            // Clear Sky
            iconName = "bi-brightness-high"
            text = "Clear Sky"
            break;
        case 1:
        case 2:
        case 3:
            // Mainly clear, partly cloudy, and overcast
            iconName = "bi-cloud-sun"
            text = "Partly Cloudy"
            break;
        case 45:
        case 48:
            iconName = "bi-cloud-fog"
            text = "Cloudy"
            // Fog and depositing rime fog
            break;
        case 51:
        case 53: 
        case 55:
            // Drizzle: Light, moderate, and dense intensity
            iconName = "bi-cloud-drizzle"
            text = "Drizzle"
            break;
        case 56:
        case 57:	
            // Freezing Drizzle: Light and dense intensity
            iconName = "bi-cloud-hai"
            text = "Freezing Drizzle"
            break;
        case 61: 
        case 63: 
        case 65:
            //	Rain: Slight, moderate and heavy intensity
            iconName = "bi-cloud-rain"
            text = "Rain"
            break;
        case 66: 
        case 67:
            //Freezing Rain: Light and heavy intensity
            iconName = "bi-cloud-sleet"
            text= "Freezing Rain"
            break	
        case 71: 
        case 73: 
        case 75:
            //Snow fall: Slight, moderate, and heavy intensity
            iconName = "bi-cloud-snow"
            text = "Snow fall"
            break	
        case 77:	
            //Snow grains
            iconName = "bi-cloud-snow"
            text = "Snow grains"
            break
        case 80: 
        case 81: 
        case 82:
            //Rain showers: Slight, moderate, and violent
            iconName = "bi-cloud-rain-heavy"
            text = "Rain showers"
            break	
        case 85: 
        case 86:	
            //Snow showers slight and heavy
            iconName = "bi-cloud-snow"
            text = "Snow showers"
            break
        case 95: 	
            //Thunderstorm: Slight or moderate
            iconName = "bi-cloud-lightning"
            text = "Thunderstorm"
            break
        case 96: 
        case 99:  
            iconName = "bi-cloud-lightning-rain"
            //Thunderstorm with slight and heavy hail
            text = "Thunderstorm"
            break       
    }

    document.querySelector(".weather-icon").innerHTML = `<i class="bi ${iconName}"></i>`;
    document.querySelector(".weather-icon-text").innerHTML = text;
    
    document.querySelector(".weather-degree").innerHTML = todayWeather + unit;
    document.querySelector("#weather-icon-degree-row").classList.remove("d-none");
    document.querySelector("#loading").classList.add("d-none");
}

getWeather();