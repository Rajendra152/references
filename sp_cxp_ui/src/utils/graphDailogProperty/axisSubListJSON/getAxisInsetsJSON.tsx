
export const getAxisJSON = (layout:any,currAxis:any)=>{
  if(layout.hasOwnProperty('scene')){
    return layout.scene[currAxis.key]
  }
 else if(layout.hasOwnProperty('ternary')){
    return layout.ternary[currAxis.key]
  }
 else if(layout.graphType === 'polarPlot'){
    return layout.polar[currAxis.key]
  }
 else if(layout.graphType === 'radarPlot'){
    return layout.polar[currAxis.key]
  }
  else {
    return layout[currAxis.key]
  }
}

export const getLinesJSON = (layout:any, properties:any, axis:string ) => {

  let lineProperties = getLayoutByAxis(layout, axis);

  // ternary need to add.
  const lineJSON = {
    showline: lineProperties.showline,
    linecolor: lineProperties.linecolor,
    linewidth: lineProperties.linewidth,
    lineopacity: lineProperties.lineopacity,
    mirror: lineProperties.mirror,
    side: lineProperties.side,
    angle:lineProperties.angle
  }

  return lineJSON
}

export const getRadarLinesJSON = (layout:any, properties:any, axis:string ) => {

  let lineProperties = getLayoutByAxis(layout, axis);

  // ternary need to add.
  const lineJSON = {
    showline: lineProperties.showline,
    linecolor: lineProperties.linecolor,
    linewidth: lineProperties.linewidth,
    lineopacity: lineProperties.lineopacity,
    mirror: lineProperties.mirror,
    side: lineProperties.side,
    angle:lineProperties.angle,
    gridcolor:layout.polar.angularaxis.gridcolor,
    gridwidth:layout.polar.angularaxis.gridwidth,
  }

  return lineJSON
}

export const getTernaryLinesJSON = (layout:any, properties:any, axis:string ) => {

  let lineProperties = getLayoutByAxis(layout, axis);
  console.log("prop",lineProperties)
  console.log("axis",axis)
  console.log("lay",layout)



  // ternary need to check by rahul. 
  const lineJSON = { 
    showline: lineProperties.showline,
    linecolor: lineProperties.linecolor,
    linewidth: lineProperties.linewidth,
    lineopacity: lineProperties.lineopacity,
    mirror: lineProperties.mirror,
    side: lineProperties.side,
  }

  return lineJSON
}

export const getScalingJSON = (layout:any, properties:any, axis:string ) =>{
  // Need to check for all
  // let scaleProperties:any;

  // if(axis == 'x'){
  //   scaleProperties = layout.xaxis
  // }
  // else if(axis == 'y'){
  //   scaleProperties = layout.yaxis
  // }
  // else if(axis == 'y'){
  //   scaleProperties = layout.zaxis
  // }
  let scaleProperties = getLayoutByAxis(layout, axis);

  const scaleJSON = {
    type: scaleProperties.type,
    autorange: scaleProperties.autorange,
    range: scaleProperties.range
  }

  return scaleJSON
}

export const getPolarScalingJSON = (layout:any, properties:any, axis:string ) =>{

  let scaleProperties = getLayoutByAxis(layout, axis);

  const scaleJSON = {
    type: scaleProperties.type,
    autorange: scaleProperties.autorange,
    range: scaleProperties.range,
    sector:layout.polar.sector,
    rotation:scaleProperties.rotation,
    thetaunit:scaleProperties.thetaunit,
  }

  return scaleJSON
}

export const getRadarLabelsTicksJSON = (layout:any, properties:any) =>{
  let majorProp = layout.polar.angularaxis

  // showticklabels only bottom true or false
  const getMajorLabelJSON = {
    showticklabels: majorProp.showticklabels,
    tickprefix: majorProp.tickprefix,
    showtickprefix: majorProp.showtickprefix,
    ticksuffix: majorProp.ticksuffix,
    showticksuffix: majorProp.showticksuffix,

    ticks: majorProp.ticks,
    ticklen: majorProp.ticklen,
    tickwidth: majorProp.tickwidth,
    tickcolor: majorProp.tickcolor,

    /* tick intervals */
    tickmode: majorProp.tickmode, // auto | linear | array
    // nticks: 5, // number of ticks
    tick0: majorProp.tick0, // start of the tick
    dtick: majorProp.dtick, // interval between ticks
    //tickvals: majorTick.tickvals ? majorTick.tickvals : [],
    // ticktext: [1,2,3,4,5],
  }

  return getMajorLabelJSON;
}

export const getMajorLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorProp = getLayoutByAxis(layout, axis);

  // showticklabels only bottom true or false
  const getMajorLabelJSON = {
    showticklabels: majorProp.showticklabels,
    tickprefix: majorProp.tickprefix,
    showtickprefix: majorProp.showtickprefix,
    ticksuffix: majorProp.ticksuffix,
    showticksuffix: majorProp.showticksuffix,
    side:majorProp.side
  }

  return getMajorLabelJSON;

}

export const getMajorPolarLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorProp = getLayoutByAxis(layout, axis);

  // showticklabels only bottom true or false
  const getMajorLabelJSON = {
    showticklabels: majorProp.showticklabels,
    tickprefix: majorProp.tickprefix,
    showtickprefix: majorProp.showtickprefix,
    ticksuffix: majorProp.ticksuffix,
    showticksuffix: majorProp.showticksuffix,
    side:majorProp.side
  }

  return getMajorLabelJSON;
}

export const getMajorTernaryLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorProp = getLayoutByAxis(layout, axis);

  // showticklabels only bottom true or false
  const getMajorLabelJSON = {
    showticklabels: majorProp.showticklabels,
    tickprefix: majorProp.tickprefix,
    showtickprefix: majorProp.showtickprefix,
    ticksuffix: majorProp.ticksuffix,
    showticksuffix: majorProp.showticksuffix,
  }

  return getMajorLabelJSON;
}

export const getMinorLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorProp = getLayoutByAxis(layout, axis);

  // showticklabels only bottom true or false
  const getMajorLabelJSON = {
    showticklabels: majorProp.showticklabels,
    tickprefix: majorProp.tickprefix,
    showtickprefix: majorProp.showtickprefix,
    ticksuffix: majorProp.ticksuffix,
    showticksuffix: majorProp.showticksuffix,
  }

  return getMajorLabelJSON;
}

export const getMinorPolarLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorProp = getLayoutByAxis(layout, axis);

  // showticklabels only bottom true or false
  const getMajorLabelJSON = {
    showticklabels: majorProp.showticklabels,
    tickprefix: majorProp.tickprefix,
    showtickprefix: majorProp.showtickprefix,
    ticksuffix: majorProp.ticksuffix,
    showticksuffix: majorProp.showticksuffix,
  }

  return getMajorLabelJSON;
}

export const getMinorTernaryLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  return {}
}

export const getMajorTernaryTickLabelJSON = (layout:any, properties:any, axis:string ) =>{
  let majorTickProp = getLayoutByAxis(layout, axis)

  const majortickJSON = {
    showexponent: majorTickProp.showexponent,
    minexponent: majorTickProp.minexponent,
    exponentformat: majorTickProp.exponentformat,
    tickfont: {
      family: majorTickProp.tickfont.family,
      size: majorTickProp.tickfont.size,
      color: majorTickProp.tickfont.color,
    },
  }

  return majortickJSON
}
export const getMinorTernaryTickLabelJSON = (layout:any, properties:any, axis:string ) =>{
  return {}
}
export const getMajorTickLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorTickProp = getLayoutByAxis(layout, axis)

  const majortickJSON = {
    showexponent: majorTickProp.showexponent,
    minexponent: majorTickProp.minexponent,
    exponentformat: majorTickProp.exponentformat,
    tickfont: {
      family: majorTickProp.tickfont.family,
      size: majorTickProp.tickfont.size,
      color: majorTickProp.tickfont.color,
    },
  }

  return majortickJSON

}

export const getMinorTickLabelsJSON = (layout:any, properties:any, axis:string ) =>{
  let majorTickProp = getLayoutByAxis(layout, axis)

  const majortickJSON = {
    showexponent: majorTickProp.showexponent,
    minexponent: majorTickProp.minexponent,
    exponentformat: majorTickProp.exponentformat,
    tickfont: {
      family: majorTickProp.tickfont.family,
      size: majorTickProp.tickfont.size,
      color: majorTickProp.tickfont.color,
    },
  }

  return majortickJSON
}

export const getMajorTicksJSON = (layout:any, properties:any, axis:string ) =>{

  let majorTick = getLayoutByAxis(layout, axis)

  const majorTickJSON = {
    ticks: majorTick.ticks,
    ticklen: majorTick.ticklen,
    tickwidth: majorTick.tickwidth,
    tickcolor: majorTick.tickcolor,

    /* tick intervals */
    tickmode: majorTick.tickmode, // auto | linear | array
    // nticks: 5, // number of ticks
    tick0: majorTick.tick0, // start of the tick
    dtick: majorTick.dtick, // interval between ticks
    //tickvals: majorTick.tickvals ? majorTick.tickvals : [],
    // ticktext: [1,2,3,4,5],
  }

  return majorTickJSON

}

export const getMajorTernaryTicksJSON = (layout:any, properties:any, axis:string ) =>{

}

export const getMinorTicksJSON = (layout:any, properties:any, axis:string ) =>{
  let majorTick = getLayoutByAxis(layout, axis)

  const majorTickJSON = {
    ticks: majorTick.ticks,
    ticklen: majorTick.ticklen,
    tickwidth: majorTick.tickwidth,
    tickcolor: majorTick.tickcolor,

    /* tick intervals */
    tickmode: majorTick.tickmode, // auto | linear | array
    // nticks: 5, // number of ticks
    tick0: majorTick.tick0, // start of the tick
    dtick: majorTick.dtick, // interval between ticks
    //tickvals: majorTick.tickvals ? majorTick.tickvals : [],
    // ticktext: [1,2,3,4,5],
  }

  return majorTickJSON
}

export const getMinorTernaryTicksJSON = (layout:any, properties:any, axis:string ) =>{

}

export const getAxisFillsJSON = (layout:any, properties:any ) =>{

}

export const getBreaksJSON = (layout:any, properties:any ) =>{

}

const getLayoutByAxis = (layout:any, axis:String) => {
console.log("axiz",axis , layout) 
  let axisProperties:any;

  if(axis == 'xaxis' || axis == 'aaxis'){
    if(layout.hasOwnProperty('ternary')){
      axisProperties = layout.ternary.aaxis
    }
    else if(layout.hasOwnProperty('scene')){
      axisProperties = layout.scene.xaxis
    }
   else if(layout.hasOwnProperty('xaxis')){
      axisProperties = layout.xaxis
    }
  }
  else if(axis == 'yaxis' || axis == 'baxis'){
    if(layout.hasOwnProperty('ternary')){
      axisProperties = layout.ternary.baxis
    }
    else if(layout.hasOwnProperty('scene')){
      axisProperties = layout.scene.yaxis
    }
   else if(layout.hasOwnProperty('yaxis')){
      axisProperties = layout.yaxis
    }
  }
  else if(axis == 'zaxis' || axis == 'caxis'){
    if(layout.hasOwnProperty('ternary')){
      axisProperties = layout.ternary.caxis
    }
    else if(layout.hasOwnProperty('scene')){
      axisProperties = layout.scene.zaxis
    }
  else  if(layout.hasOwnProperty('zaxis')){
      axisProperties = layout.zaxis
    }
  }
  else if(axis == 'Pie'){
    if(layout.hasOwnProperty('pie')){
      axisProperties = layout.pie
    }
  }
  else if(axis == 'radialaxis'){
      axisProperties = layout.polar.radialaxis
    
  }
  else if(axis == 'angularaxis'){
      axisProperties = layout.polar.angularaxis
  }

  return axisProperties;
}
