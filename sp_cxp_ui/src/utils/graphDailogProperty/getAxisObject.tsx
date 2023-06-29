
import {
  LINES, SCALING, RADAR_LABELS_TICKS, MAJOR_LABELS, MAJOR_POLAR_LABELS, MAJOR_TERNARY_LABELS,
  MINOR_LABELS, MINOR_POLAR_LABELS, MINOR_TERNARY_LABELS, MAJOR_TICK_LABELS, MINOR_TICK_LABELS,
  MAJOR_TICKS, MAJOR_TERNARY_TICKS, MINOR_TICKS, MINOR_TERNARY_TICKS, AXIS_FILLS, BREAKS
} from "../../components/Constant/GraphDialog";

import {
  getLinesJSON, getScalingJSON, getRadarLabelsTicksJSON,
  getMajorLabelsJSON, getMajorPolarLabelsJSON, getMajorTernaryLabelsJSON,
  getMajorTicksJSON, getMinorLabelsJSON, getMinorTicksJSON, getMajorTickLabelsJSON,
  getMinorTickLabelsJSON, getMajorTernaryTickLabelJSON, getMinorTernaryTickLabelJSON,
  getMinorTernaryLabelsJSON,getTernaryLinesJSON,getPolarScalingJSON,getRadarLinesJSON
} from "./axisSubListJSON/getAxisInsetsJSON";


export const getAxisObject = (layout: any, properties: any, axis: string) => {


  if (layout.graphType === 'polarPlot') {
    return getPolarAxisSubInsets(layout, properties, axis)
  }
  else if (layout.graphType === 'radarPlot') {
    return getRadarAxisSubInsets(layout, properties, axis)
  }
  else if (properties.type === 'scatterternary') {

    return getTernaryAxisSubInsets(layout, properties, axis)
  }
  else if (properties.type === 'scatter3d' || properties.type === 'mesh3d') {
    return get3DAxisSubInsets(layout, properties, axis)
  }
  else if (properties.type === 'contour') {
    return getContourAxisSubInsets(layout, properties, axis)
  }
  else {
    return get2DAxisSubInsets(layout, properties, axis)
  }

}

export const getAllAxis = (layout:any, properties:any) => {
  const allAxis = []
  if (properties?.type == 'pie') {
    allAxis.push({ key: 'pie', text: 'Pie', disabled: false })
  }
  else if(typeof layout == "object"){
    if (layout.hasOwnProperty('geo')) {
      allAxis.push({ key: 'geo', text: layout.geo.title.text, disabled: false })
    }
    else if (layout.hasOwnProperty('ternary')) {
      allAxis.push(
        { key: 'aaxis', text: layout.ternary.aaxis.title.text, disabled: false },
        { key: 'baxis', text: layout.ternary.baxis.title.text, disabled: false },
        { key: 'caxis', text: layout.ternary.caxis.title.text, disabled: false },
      )
    }
    else if (layout.hasOwnProperty('scene')){
      allAxis.push(
        {key:'xaxis', text: layout.scene.xaxis.title.text, disabled: false},
        {key:'yaxis', text: layout.scene.yaxis.title.text, disabled: false},
        {key:'zaxis', text: layout.scene.zaxis.title.text, disabled: false},
      )
    }
    else if (layout?.graphType==='polarPlot') {
      allAxis.push(
        { key: 'radialaxis', text: layout.polar.radialaxis.title.text, disabled: false },
        { key: 'angularaxis', text: layout.polar.angularaxis.title.text, disabled: false }
      )
    }
    else if (layout?.graphType==='radarPlot') {
      allAxis.push(
        { key: 'radialaxis', text: layout.polar.radialaxis.title.text, disabled: false },
        )
    }
    else if (layout.hasOwnProperty('xaxis')) {
      allAxis.push(
        { key: 'xaxis', text: layout.xaxis.title.text, disabled: false },
        { key: 'yaxis', text: layout.yaxis.title.text, disabled: false }
      )
    }
  }
  return allAxis
}


export const get2DAxisSubInsets = (layout, properties, axis) => {
  const axisObj = {
    [LINES]: getLinesJSON(layout, properties, axis),
    [SCALING]: getScalingJSON(layout, properties, axis),
    [MAJOR_LABELS]: getMajorLabelsJSON(layout, properties, axis),
    // [MINOR_LABELS]: getMinorLabelsJSON(layout, properties, axis),
    [MAJOR_TICK_LABELS]: getMajorTickLabelsJSON(layout, properties, axis),
    // [MINOR_TICK_LABELS]: getMinorTickLabelsJSON(layout, properties, axis),
    [MAJOR_TICKS]: getMajorTicksJSON(layout, properties, axis),
    // [MINOR_TICKS]: getMinorTicksJSON(layout, properties, axis),
    // [BREAKS]: {}
  }

  return axisObj
}

export const getContourAxisSubInsets = (layout, properties, axis) => {
  const axisObj = {
    [LINES]: getLinesJSON(layout, properties, axis),
    [SCALING]: getScalingJSON(layout, properties, axis),
    [MAJOR_LABELS]: getMajorLabelsJSON(layout, properties, axis),
    // [MINOR_LABELS]: getMinorLabelsJSON(layout, properties, axis),
    [MAJOR_TICK_LABELS]: getMajorTickLabelsJSON(layout, properties, axis),
    // [MINOR_TICK_LABELS]: getMinorTickLabelsJSON(layout, properties, axis),
    [MAJOR_TICKS]: getMajorTicksJSON(layout, properties, axis),
    // [MINOR_TICKS]: getMinorTicksJSON(layout, properties, axis),
  }

  return axisObj
}

export const getRadarAxisSubInsets = (layout:any, properties:any, axis:any) => {

  const axisObj = {
    [LINES]: getRadarLinesJSON(layout, properties, axis),
    [SCALING]: getScalingJSON(layout, properties, axis),
    [RADAR_LABELS_TICKS]: getRadarLabelsTicksJSON(layout, properties),
    [MAJOR_LABELS]: getMajorLabelsJSON(layout, properties, axis),
    // [MINOR_LABELS]: getMinorLabelsJSON(layout, properties, axis),
    [MAJOR_TICK_LABELS]: getMajorTickLabelsJSON(layout, properties, axis),
    // [MINOR_TICK_LABELS]: getMinorTickLabelsJSON(layout, properties, axis),
    [MAJOR_TICKS]: getMajorTicksJSON(layout, properties, axis),
    // [MINOR_TICKS]: getMinorTicksJSON(layout, properties, axis),
    // [AXIS_FILLS]: {},
  }

  return axisObj
}

export const getPolarAxisSubInsets = (layout, properties, axis) => {
  console.log("Axis-->", axis)
  let axisObj = {}
  if(axis==='radialaxis'){
    axisObj = {
      [LINES]: getLinesJSON(layout, properties, axis),
      [SCALING]: getScalingJSON(layout, properties, axis),
      [MAJOR_POLAR_LABELS]: getMajorPolarLabelsJSON(layout, properties, axis),
      // [MINOR_POLAR_LABELS]: {},
      [MAJOR_TICK_LABELS]: getMajorTickLabelsJSON(layout, properties, axis),
      // [MINOR_TICK_LABELS]: getMinorTickLabelsJSON(layout, properties, axis),
      [MAJOR_TICKS]: getMajorTicksJSON(layout, properties, axis),
      // [MINOR_TICKS]: getMinorTicksJSON(layout, properties, axis),
    }
  }
  else if(axis === 'angularaxis'){
    axisObj = {
      [LINES]: getLinesJSON(layout, properties, axis),
      [SCALING]: getPolarScalingJSON(layout, properties, axis),
      [MAJOR_LABELS]: getMajorLabelsJSON(layout, properties, axis),
      // [MINOR_LABELS]: getMinorLabelsJSON(layout, properties, axis),
      [MAJOR_TICK_LABELS]: getMajorTickLabelsJSON(layout, properties, axis),
      // [MINOR_TICK_LABELS]: getMinorTickLabelsJSON(layout, properties, axis),
      [MAJOR_TICKS]: getMajorTicksJSON(layout, properties, axis),
      // [MINOR_TICKS]: getMinorTicksJSON(layout, properties, axis),
    }
  }

  return axisObj
}

export const getTernaryAxisSubInsets = (layout, properties, axis) => {

  const axisObj = {
    [LINES]: getTernaryLinesJSON(layout, properties, axis), 
    // [SCALING]: getScalingJSON(layout, properties, axis),
    [MAJOR_TERNARY_LABELS]: getMajorTernaryLabelsJSON(layout, properties, axis),
    // [MINOR_TERNARY_LABELS]: getMinorTernaryLabelsJSON(layout, properties, axis),
    [MAJOR_TICK_LABELS]: getMajorTernaryTickLabelJSON(layout, properties, axis),
    // [MINOR_TICK_LABELS]: getMinorTernaryTickLabelJSON(layout, properties, axis),
    [MAJOR_TERNARY_TICKS]: getMajorTicksJSON(layout, properties, axis),
    // [MINOR_TERNARY_TICKS]: getMinorTicksJSON(layout, properties, axis),
  }

  return axisObj
}

export const get3DAxisSubInsets = (layout, properties, axis) => {

  const axisObj = {
    [LINES]: getLinesJSON(layout, properties, axis),
    [SCALING]: getScalingJSON(layout, properties, axis),
    [MAJOR_LABELS]: getMajorLabelsJSON(layout, properties, axis),
    // [MINOR_LABELS]: getMinorLabelsJSON(layout, properties, axis),
    [MAJOR_TICK_LABELS]: getMajorTickLabelsJSON(layout, properties, axis),
    // [MINOR_TICK_LABELS]: getMinorTickLabelsJSON(layout, properties, axis),
    [MAJOR_TICKS]: getMajorTicksJSON(layout, properties, axis),
    // [MINOR_TICKS]: getMinorTicksJSON(layout, properties, axis),
  }

  return axisObj
}


