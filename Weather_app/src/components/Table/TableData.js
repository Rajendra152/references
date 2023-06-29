import React from 'react';
import { TableContainer,Table,TableBody,TableCell,TableHead,TableRow,Paper } from '@mui/material';


function TableData({data,isCelsius,currentDay}) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const singleDayData = data.forecast.forecastday[currentDay].hour;
  const date = new Date(data.forecast.forecastday[currentDay].date);
  console.log(days[date.getDay()])

  return (
    <TableContainer component={Paper} className="table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{days[currentDay]}</TableCell>
            <TableCell align="right">Icon</TableCell>
            <TableCell align="right">Temp</TableCell>
            <TableCell align="right">Wind</TableCell>
            <TableCell align="right">Precip.</TableCell>
            <TableCell align="right">Cloud</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">Pressure</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            !isCelsius
              ? singleDayData.map((item,i) => (
                (i%3)===0?
                  <TableRow key={i}>
                    <TableCell>
                      {item.time.split(' ')[1]}
                    </TableCell>
                    <TableCell>
                      <img src={item.condition.icon} alt="" />
                    </TableCell>
                    <TableCell >{item.temp_f} &#176;F</TableCell>
                    <TableCell >{item.wind_mph} mph</TableCell>
                    <TableCell >{item.precip_in} in</TableCell>
                    <TableCell >{item.cloud}%</TableCell>
                    <TableCell >{item.humidity}%</TableCell>
                    <TableCell >{item.pressure_in} in</TableCell>
                  </TableRow>
                :""
              ))
              : singleDayData.map((item,i) => (
                (i%3)===0?
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {item.time.split(' ')[1]}
                    </TableCell>
                    <TableCell>
                      <img src={item.condition.icon} alt="" />
                    </TableCell>
                    <TableCell>{item.temp_c} &#176;C</TableCell>
                    <TableCell>{item.wind_kph} kmph</TableCell>
                    <TableCell>{item.precip_mm} mm</TableCell>
                    <TableCell>{item.cloud}%</TableCell>
                    <TableCell>{item.humidity}%</TableCell>
                    <TableCell>{item.pressure_mb} mb</TableCell>
                  </TableRow>
                  :""
              ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableData