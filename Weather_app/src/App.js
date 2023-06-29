import axios from 'axios';
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Table from './components/Table/Table';
import WeatherMainCard from './components/WeatherMainCard';
import TodaysWeather from './components/TodaysWeather';
import Error from './components/Error';
import Loader from './components/Loader';


function App() {

  const [data, setData] = useState({})
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [isCelsius, setIsCelsius] = useState(false)
  const [currentDayNo, setcurrentDayNo] = useState(0)
  const [submitted, setSubmitted] = useState(false)


  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]





  const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';
  // https://api.weatherapi.com/v1/forecast.json?key=0b81c00069be4d3fa7262132220408&q=hyderabad&days=7&aqi=no&alerts=no

  const fetchApiData =  () => {
    if (userInput) {
      axios
        .get(BASE_URL,{
          params:{
            key:'0b81c00069be4d3fa7262132220408',
            q:userInput,
            days:7,
            aqi:"no",
            alerts:"no"
          }
        })
        .then(res=>{
          setData(res.data)
          setError()
          setcurrentDayNo(new Date().getDay())
          setLoading(false)
          console.log(res)
        })
        .catch(err=>{
          setError({err,userInput})
          setLoading(false)
        }
      )
  }

    
  }

  const HandleFormSubmit = (e)=>{
    e.preventDefault();
    setSubmitted(true)
    setLoading(true)
    fetchApiData()
    setUserInput("")
  }

  //Setting currentday
  const setCurrentDay = (currentDate)=>{
    const date = new Date(currentDate)
    return days[date.getDay()];
  }

  const handleUnit = (unit)=>{
    console.log(unit)
    const target = document.getElementsByClassName("unit")
    switch (unit) {
      case "c":
        setIsCelsius(true)
        target[0].classList.remove("active")
        target[1].classList.add("active")
        break;
      case "f":
        setIsCelsius(false)
        target[1].classList.remove("active")
        target[0].classList.add("active")
        break;
      default:setIsCelsius(false)
        break;
    }
  }

  return (
    <div id="container">
      <SearchBar HandleFormSubmit={HandleFormSubmit} setUserInput={setUserInput}/>
      
      {
        error && !loading
        ?
          <Error data={error}/>
        : loading
          ?
          <Loader/>
          :
          <>
              {
                Object.keys(data).length >0 && !loading?
                  
                  <>
                    <WeatherMainCard data={data} isCelsius={isCelsius} handleUnit={handleUnit} setCurrentDay={setCurrentDay} />
                    <TodaysWeather data={data} isCelsius={isCelsius}/>
                    <Table data={data} currentDayNo={currentDayNo} setcurrentDayNo={setcurrentDayNo} isCelsius={isCelsius} days={days}/>
                  </>
                :submitted?<Loader/>:""

              }
          </>
      }
    </div>
  );
}

export default App;
