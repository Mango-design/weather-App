import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [wheater, setWeather]= useState({})

  useEffect(() =>{
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=009f148e24dedf5e97539290badc823f`)
      .then(res => setWeather((res.data)))
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error);  
  },[])
  
  const centigrades = ((wheater.main?.temp) - 273.15).toFixed(2)
  const farenheit = ((centigrades *1.8) + 32).toFixed(2)

  const [iscentigrades, setIsCentigrades] = useState(true);
  const changeUnits = () => {
    setIsCentigrades(!iscentigrades);
  };

  return (
    <div className="App">
      <div className='wheater'>
        <h1 className='title'>Wheater App</h1>
        <h2 className='sub-title'>{wheater.name}, {wheater.sys?.country}</h2>
        <div className='content'>
          <img className='icon' src={`https://openweathermap.org/img/wn/${wheater.weather?.[0].icon}@2x.png`} alt="icon" />
          <div className='description'>
          <h3>"{wheater.weather?.[0].description}"</h3>
         
          <h3><i class="fa-solid fa-wind"></i> wind speed: {wheater.wind?.speed} m/s</h3>
         
          
          <h3><i class="fa-solid fa-cloud"></i> clouds: {wheater.clouds?.all}</h3>
         
          <h3><i class="fa-solid fa-temperature-quarter"></i> pressure: {wheater.main?.pressure} mb</h3>
          </div>
          </div>
          <h3 className='unit'>  <span className='temp'>Temperature:</span>  {iscentigrades ? centigrades: farenheit} {iscentigrades ? '°C' : '°F'}</h3>
        <button className='btn' onClick={changeUnits}>Change degrees °F/°C</button>
      </div>
     
    </div>
  )
}

export default App
