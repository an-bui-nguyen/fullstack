import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({location}) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => { 
        const fetchWeather = async (location) => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const params = new URLSearchParams({
                q:location,
                units: "metric",
                appid: API_KEY
            });
            const weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + params.toString();
            try {
                const weather = await axios.get(weatherURL).catch((error) => {console.error(error)});
                return weather;
            } catch (error) {
                console.error(error);
            }
        }

        const fetchData = async () => {
            const data = await fetchWeather(location)
            setWeatherData(data.data)
        }
        (async () => {
            await fetchData().catch((error) => {console.error(error)});
        })();
    }, [location])

    const icon = (weatherData) ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : null;

    return (
        <div>
            {(weatherData) 
                ? (
                <div>
                    <p>temperature {weatherData.main.temp} degrees Celsius</p>
                    <img src={icon} alt={weatherData.weather[0].description} style={{maxHeight: "150px", maxWidth:"200px"}}></img>
                    <p>wind {weatherData.wind.speed} m/s</p>
                </div>)
                : null}
        </div>
    )

}

export default Weather;