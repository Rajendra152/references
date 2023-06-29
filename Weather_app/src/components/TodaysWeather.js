import React from 'react'
import './TodaysWeather.css'

function TodaysWeather({data,isCelsius}) {
  return (
    <div id="todays_weather">
              <h1>Today's Weather in {data.location.name}</h1>
              <div className="todays_weather_data">
                <div className="sun_moon_timings">
                  <div className="sun_timings">
                    <p>Sunrise {data.forecast.forecastday[0].astro.sunrise}</p>
                    <p>Sunset {data.forecast.forecastday[0].astro.sunset}</p>
                  </div>
                  <div className="moon_timings">
                    <p>Moonrise {data.forecast.forecastday[0].astro.moonrise}</p>
                    <p>Moonset {data.forecast.forecastday[0].astro.moonset}</p>
                  </div>
                </div>
                <div className="todays_weather_data_right">
                  <div className="max">
                    <p>Max. </p>
                    <p>{isCelsius?data.forecast.forecastday[0].day.maxtemp_c:data.forecast.forecastday[0].day.maxtemp_f} {isCelsius?<><sup>o</sup>C</>:<><sup>o</sup>F</>}</p>

                  </div>
                  <div className="min">
                    <p>Min. </p>
                    <p>{isCelsius?data.forecast.forecastday[0].day.mintemp_c:data.forecast.forecastday[0].day.mintemp_f} {isCelsius?<><sup>o</sup>C</>:<><sup>o</sup>F</>}</p>

                  </div>
                  <div className="avg">
                    <p>Avg. </p>
                    <p>{isCelsius?data.forecast.forecastday[0].day.avgtemp_c:data.forecast.forecastday[0].day.avgtemp_f} {isCelsius?<><sup>o</sup>C</>:<><sup>o</sup>F</>}</p>
                    {/* <p>{data.forecast.forecastday[0].day.avgtemp_c}</p> */}
                  </div>
                  <div className="precip">
                    <p>Precip. </p>
                    <p>{data.forecast.forecastday[0].day.totalprecip_mm} mm</p>
                  </div>
                  <div className="max_wind">
                    <p>Max. wind </p>
                    <p>{data.forecast.forecastday[0].day.maxwind_kph} kmh</p>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default TodaysWeather