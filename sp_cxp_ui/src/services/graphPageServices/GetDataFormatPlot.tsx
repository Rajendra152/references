

export const getPieFormatPlot = (gridData:[[]], plotData: any, plotProperties:any, getDataFromGrid:Function) => {
  let allPlots = []
  for(let index=0; index<plotData.values.length; index++){
    const plotObj = {
      values:[],
      labels:[],
    }
    plotObj.values = getDataFromGrid(gridData[plotData.values[index]].slice(1))
    plotObj.labels = getDataFromGrid(gridData[plotData.values[index]].slice(1))
    allPlots.push({...plotObj, ...plotProperties})

  }
  return allPlots
}


export const getrThetaFormatPlot = (gridData:[[]], plotData: any, plotProperties:any,getDataFromGrid:Function) => {
  let allPlots = []
  for(let index=0; index<plotData.theta.length; index++){
    const plotObj = {
      r:[],
      theta:[],
    }
    plotObj.theta = getDataFromGrid(gridData[plotData.theta[index]].slice(1))

    if(plotData.r){
      plotObj.r = getDataFromGrid(gridData[plotData.r[0]].slice(1))
    }
    allPlots.push({...plotObj,...plotProperties})
  }
  return allPlots
}


export const getABCTernaryFormatPlot = (gridData:[[]], plotData: any, plotProperties:any, getDataFromGrid:Function) => {
  let allPlots = []
  if(plotData.a && plotData.b && plotData.c){
    for(let index=0; index<plotData.a.length; index++){
      let plotObj = {
        a:[],
        b:[],
        c:[]
      }
      plotObj.a = getDataFromGrid(gridData[plotData.a[index]].slice(1))
      plotObj.b = getDataFromGrid(gridData[plotData.b[index]].slice(1))
      plotObj.c = getDataFromGrid(gridData[plotData.c[index]].slice(1))

      allPlots.push({...plotObj,...plotProperties})
    }
  }
  else if( plotData.a && plotData.b ){
    let loopLength = 0;
    loopLength = plotData.b.length>plotData.a.length ?  plotData.b.length :  plotData.a.length
    for(let index=0; index<loopLength; index++){
      let plotObj = {
        a:[],
        b:[],
        c:[]
      }
      plotObj.a = getDataFromGrid(gridData[plotData.a[index]].slice(1))
      plotObj.b = getDataFromGrid(gridData[plotData.b[index]].slice(1))
      plotObj.c = Array.from({length: loopLength}, (v, i) => i+1);

      allPlots.push({...plotObj,...plotProperties})
    }
  }
  else if( plotData.a && plotData.c ){
    let loopLength = 0;
    loopLength = plotData.a.length>plotData.c.length ?  plotData.a.length :  plotData.c.length
    for(let index=0; index<loopLength; index++){
      let plotObj = {
        a:[],
        b:[],
        c:[]
      }
      plotObj.a = getDataFromGrid(gridData[plotData.a[index]].slice(1))
      plotObj.c = getDataFromGrid(gridData[plotData.c[index]].slice(1))
      plotObj.b = Array.from({length: loopLength}, (v, i) => i+1);

      allPlots.push({...plotObj,...plotProperties})
    }
  }
  else if( plotData.b && plotData.c ){
    let loopLength = 0;
    loopLength = plotData.b.length>plotData.c.length ?  plotData.b.length :  plotData.c.length
    for(let index=0; index<loopLength; index++){
      let plotObj = {

      }
      plotObj.b = getDataFromGrid(gridData[plotData.b[index]].slice(1))
      plotObj.c = getDataFromGrid(gridData[plotData.c[index]].slice(1))
      plotObj.a = Array.from({length: loopLength}, (v, i) => i+1);

      allPlots.push({...plotObj,...plotProperties})
    }
  }
  return allPlots
}


export const getXYZ_3D_FormatPlot = (gridData:[[]], plotData: any, plotProperties:any, getDataFromGrid:Function) => {
  let allPlots = []
  let loopLength = 0;

  if(plotData.y && plotData.x && plotData.z){
    loopLength = plotData.z.length
    for(let index=0; index<loopLength; index++){
      const plotObj = {
        x:[],
        y:[],
        z:[],
      }
      if(plotData.x.length===1){
        plotObj.x = getDataFromGrid(gridData[plotData.x[0]].slice(1))
      }
      else{
        plotObj.x = getDataFromGrid(gridData[plotData.x[index]].slice(1))
      }

      if(plotData.y.length===1){
        plotObj.y = getDataFromGrid(gridData[plotData.y[0]].slice(1))
      }
      else{
        plotObj.y = getDataFromGrid(gridData[plotData.y[index]].slice(1))
      }


      plotObj.z = getDataFromGrid(gridData[plotData.z[index]].slice(1))

      // if(plotData.bubbleSize){
      //   plotObj.size = getDataFromGrid(gridData[plotData.bubbleSize[0]].slice(1))
      // }

      allPlots.push({...plotObj,...plotProperties})

    }

  }
  else if(plotData.z){
    loopLength = plotData.z.length
    for(let index=0; index<loopLength; index++){
      let plotObj = {
        x: [],
        y: [],
        z: [],
      }
      plotObj.z = getDataFromGrid(gridData[plotData.z[index]].slice(1));
      plotObj.x = Array.from({length: plotObj.z.length}, (v, i) => i+1);
      plotObj.y = Array.from({length: plotObj.z.length}, (v, i) => i+1);


      // if(plotData.bubbleSize){
      //   plotObj.size = getDataFromGrid(gridData[plotData.bubbleSize[0]].slice(1))
      // }
      allPlots.push({...plotObj,...plotProperties})

    }
  }
}


export const getXY_FormatPlot = (gridData:[[]], plotData: any, plotProperties:any, getDataFromGrid:Function) => {
  let allPlots = []
  let loopLength = 0;
  if(plotData.y && plotData.x){
    loopLength = plotData.y.length>plotData.x.length ?  plotData.y.length :  plotData.x.length
    for(let index=0; index<loopLength; index++){
      const plotObj = {
        x:[],
        y:[],
      }
      if(plotData.x.length===1){
        plotObj.x = getDataFromGrid(gridData[plotData.x[0]].slice(1))
      }
      else{
        plotObj.x = getDataFromGrid(gridData[plotData.x[index]].slice(1))
      }

      if(plotData.y.length===1){
        plotObj.y = getDataFromGrid(gridData[plotData.y[0]].slice(1))
      }
      else{
        plotObj.y = getDataFromGrid(gridData[plotData.y[index]].slice(1))
      }

      // if(plotData.bubbleSize){
      //   plotObj.size = getDataFromGrid(gridData[plotData.bubbleSize[0]].slice(1))
      // }

      allPlots.push({...plotObj,...plotProperties})

    }

  }
  else if(plotData.y){
    loopLength = plotData.y.length
    for(let index=0; index<loopLength; index++){
      const plotObj = {
        y:[],
      }
      plotObj.y = getDataFromGrid(gridData[plotData.y[index]].slice(1))
      // if(plotData.bubbleSize){
      //   plotObj.size = getDataFromGrid(gridData[plotData.bubbleSize[0]].slice(1))
      // }
      allPlots.push({...plotObj,...plotProperties})

    }
  }
  else if(plotData.x){
    loopLength = plotData.x.length
    for(let index=0; index<loopLength; index++){
      const plotObj = {
        x:[],
      }
      plotObj.x = getDataFromGrid(gridData[plotData.x[index]].slice(1))
      // if(plotData.bubbleSize){
      //   plotObj.size = getDataFromGrid(gridData[plotData.bubbleSize[0]].slice(1))
      // }
      allPlots.push({...plotObj,...plotProperties})

    }
  }

}
