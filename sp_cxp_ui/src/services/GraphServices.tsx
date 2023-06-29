import React from 'react'


const data_scatter_regression = [
    [{
      x: [11, 20, 31],
      y: [21, 36, 43],
      type: 'scatter',
      mode: 'lines+markers',
      line: { shape : 'spline' , smoothing : 1.3},
      marker: {symbol : 'diamond-open',color: 'red'},
    }],
    {width: 600, height: 400, title: 'Scatter plot'}
  ]
  

export function getGraphData(){
    return  data_scatter_regression
}