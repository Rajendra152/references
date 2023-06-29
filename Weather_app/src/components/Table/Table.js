import React, { useState } from 'react'
import TemperatureLineChart from './TemperatureLineChart';
import TableData from './TableData';

import SsidChartIcon from '@mui/icons-material/SsidChart';
import AppsIcon from '@mui/icons-material/Apps';

import './Table.css'


function Table({currentDayNo,setcurrentDayNo,data,isCelsius,days}) {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div>
        <section id="table">
              <div className="above_table_options">
                <div className="days">
                  <div className={currentDayNo===0?'active':""} onClick={()=>setcurrentDayNo(0)}>Sunday</div>
                  <div className={currentDayNo===1?'active':""} onClick={()=>setcurrentDayNo(1)}>Monday</div>
                  <div className={currentDayNo===2?'active':""} onClick={()=>setcurrentDayNo(2)}>Tuesday</div>
                  <div className={currentDayNo===3?'active':""} onClick={()=>setcurrentDayNo(3)}>Wednesday</div>
                  <div className={currentDayNo===4?'active':""} onClick={()=>setcurrentDayNo(4)}>Thursday</div>
                  <div className={currentDayNo===5?'active':""} onClick={()=>setcurrentDayNo(5)}>Friday</div>
                  <div className={currentDayNo===6?'active':""} onClick={()=>setcurrentDayNo(6)}>Saturday</div>
                </div>
                <div className="right_options">
                  <div className={showGraph?"menu":"menu active"}  onClick={()=>setShowGraph(false)}>
                  <AppsIcon/>
                  </div>
                  <div className={showGraph ?"graph_symbol active":"graph_symbol"} onClick={()=>setShowGraph(true)}>
                    <SsidChartIcon />
                  </div>
                </div>
              </div>
                {
                  showGraph
                  ?
                  <TemperatureLineChart  storeData={data} isCelsius={isCelsius} hourDay={currentDayNo} dayname={days[currentDayNo]} />
                  :
                  <div className="table_holder">
                    <TableData data={data} isCelsius={isCelsius} currentDay={currentDayNo}/>
                  </div>
                }
              
            </section>
    </div>
  )
}

export default Table