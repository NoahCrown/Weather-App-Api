
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemparatureAndDetails from './components/TemparatureAndDetails'
import Forecast from './components/Forecast';
import {getFormattedWeatherData} from './services/weatherService';
import { useEffect, useState } from 'react';
function App() {

  const [query, setQuery] = useState({q: 'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async() => {
      await getFormattedWeatherData({...query, units})
      .then(data => setWeather(data))

     
    }
  
    fetchWeather()


  }, [query, units])

  const formatBackground  = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp === threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'

  }
  // {`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${fomratBackground}'}
  return (
    <div className> 
      <div className={`mx-auto max-w-screen-md mt-4 px-20 py-5 bg-gradient-to-br ${formatBackground()}`}>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

        {weather && (
          <>
          <TimeAndLocation weather={weather}/>
          <TemparatureAndDetails weather={weather}/>
          <Forecast title="Hourly Forecast" items={weather.hourly}/>
          <Forecast title="Daily Forecast" items={weather.daily}/>
          </>
          

        )}

        

      </div>
      
    </div>
  );
}

export default App;
