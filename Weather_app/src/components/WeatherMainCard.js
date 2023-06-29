import React from 'react'
import './WeatherMainCard.css'

function WeatherMainCard({data,isCelsius,handleUnit,setCurrentDay}) {

    const displaySevenDayWeatherCards = 
      data.forecast.forecastday.map((item,i)=>{
        return i>0?<div key={i}>
          <img src={item.day.condition.icon} alt="cloud" />
          <p>{isCelsius?item.day.avgtemp_c:item.day.avgtemp_f} {isCelsius?<><sup>o</sup>C</>:<><sup>o</sup>F</>}</p>
          <p>{setCurrentDay(item.date)}</p>
          <p>{item.day.condition.text}</p>
        </div>:""
      })
    
  return (
    <div id="main_weather_card">
                <div className="weather_card_top">
                  <p>
                    <span className='weather_card_top_city'>{data.location.name} Weather Forecast </span>
                    <span className='weather_card_top_state'>{data.location.region}, {data.location.country}</span>
                  </p>
                  <div className='temperature_units'>
                    <p className='unit active' onClick={()=>handleUnit("f")}><sup>o</sup>F</p>
                    <p className='unit' onClick={()=>handleUnit("c")}><sup>o</sup>C</p>
                  </div>
                </div>
                <div className="weather_card_main_body">
                  <div className="weather_card_main_body_top">
                    <div className="weather_card_main_body_today">
                        {
                          <>
                          <img src={data.forecast.forecastday[0].day.condition.icon} alt="cloud" className="main_cloud"/>
                          <div>
                            <p>{isCelsius?data.forecast.forecastday[0].day.avgtemp_c:data.forecast.forecastday[0].day.avgtemp_f}{isCelsius?<><sup>o</sup>C</>:<><sup>o</sup>F</>} {setCurrentDay(data.forecast.forecastday[0].date)}</p>
                            <p>{data.forecast.forecastday[0].day.condition.text}</p>
                          </div>
                          {/* <h2>{setCurrentDay(data.forecast.forecastday[0].date)}</h2> */}
                          </>
                        }
                    </div>
                    <div className="weather_card_main_body_top_right">
                      <div className="wind">
                        <p>Wind</p>
                        <p>{data.forecast.forecastday[0].day.avgvis_km} Kmph</p>
                      </div>
                      <div className="precip">
                        <p>Precip</p>
                        <p>{data.forecast.forecastday[0].day.totalprecip_in} mm</p>
                      </div>
                      <div className="pressure">
                        <p>Pressure</p>
                        <p>{data.forecast.forecastday[0].hour[0].pressure_mb} mb</p>
                      </div>
                    </div>
                  </div>
                  <div className="weather_card_main_body_bottom">
                    {displaySevenDayWeatherCards}
                  </div>
                </div>
            </div>
  )
}

export default WeatherMainCard