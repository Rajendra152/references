// import React, { useState,useEffect} from 'react'


// export function getReportData(){
//     let reportData = 'Sample'
//     // fetch('rte-data.txt')
//     //     .then(response => response.text())
//     //     .then(data => {
//     //         reportData= data
//     // });
//     return reportData
// }

import React from 'react'
import { getDataSet } from '../components/Redis/data';


export async function getReportData(key){
    console.log('Report services : '+ key)
    const data = await getDataSet(key)
    return data
}