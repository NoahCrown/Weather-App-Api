import { DateTime } from "luxon"

const API_key = 'aaf877c1f470f5d91911c1908748237b'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

// 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_key})
    return fetch(url).then(res => res.json())
}

const formatCurrentWeather = (data => {
    const {
        coord: {lat,lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country, sunrise,sunset},
        weather,
        wind: {speed}
    } = data

    const {main:details, icon} = weather[0]


    return{dt, details, icon, lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, country, sunrise, sunset,speed}

})

const formatToLocalTime = (secs, zone, format="cccc, dd, LLL, yyyy' | Local time: 'hh:mm a") => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

}

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly} = data
    daily = daily.slice(1,6).map(d => {
        return {
            title:formatToLocalTime(d.dt, timezone, 'ccc'),
            temp:d.temp.day,
            icon: d.weather[0].icon
        }
    })

    hourly = hourly.slice(1,6).map(d => {
        return {
            title:formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp:d.temp,
            icon: d.weather[0].icon
        }
    })

    return {daily, timezone, hourly}

}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(data => formatCurrentWeather(data))

    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall',
    {
        lat, 
        lon, 
    exclude:'current,minutely,alerts', 
    units:searchParams.units})
    .then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather}

}

const iconUrlFromCode = (code) =>  `http://openweathermap.org/img/wn/${code}@2x.png`



export  { getFormattedWeatherData, formatToLocalTime, iconUrlFromCode}