import React from 'react'

import { getGraphData, getRegressionData } from '../../services/GraphServices';

export const getData = () => {
    const data = getGraphData();
    return data
}

export async function getRegData(){
    const reg_data = getRegressionData();
    return reg_data
}