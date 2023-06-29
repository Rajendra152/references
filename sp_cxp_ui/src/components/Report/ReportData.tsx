import React from 'react'
import { getReportData } from '../../services/ReportServices'

export const getData = (key)=>{
   return getReportData(key)
}