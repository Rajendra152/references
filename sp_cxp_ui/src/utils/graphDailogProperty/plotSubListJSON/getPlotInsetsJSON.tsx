export const getDataJSON = (properties:Object) => {

  const dataJSON = {
    data: {
      ...properties.data
    }
  }

  return dataJSON
}

export const getSymbolJSON = ( properties:any) => {
  const symbolJSON = {
     ...JSON.parse(JSON.stringify(properties.marker)),
     fillPattern:properties.fillPattern
  }

  return symbolJSON
}

export const getLinesJSON = (properties:Object) => {
  const lineJSON = {
    line: JSON.parse(JSON.stringify(properties.line))
  }

  return lineJSON
}

export const getContourLinesJSON = (properties:Object) => {
  const lineJSON = {
    line: JSON.parse(JSON.stringify(properties.line))
  }
  lineJSON.line.colorscale = properties.colorscale
  return lineJSON
}


export const getMESHJSON = (properties:Object) => {
  const meshJSON = {
    line: JSON.parse(JSON.stringify(properties.line))
  }

  return meshJSON
}

export const getAreaFillsJSON = (properties:any) => {

  const aareaFillsJSON = {
    areaFills: {
      fill: properties.fill,
      fillcolor: properties.fillcolor,
      fillColorScheme:properties.fillColorScheme

    }
  }

  return aareaFillsJSON
}

export const getReferenceLinesJSON = (properties:Object) => {
  const refLineJSON = {
    refLines: JSON.parse(JSON.stringify(properties.refLine))
  }

  return refLineJSON
}

export const getDropLinesJSON = (layout:Object,) => {
  const dropLineJSON = {
    dropLines: JSON.parse(JSON.stringify(layout.droplines))
  }

  return dropLineJSON
}

//CS

export const get3DLinesJSON = (layout:Object, properties:Object) => {

}

export const getFillsJSON = (properties:any) => {
  const fillProp = {
    color:properties.fillcolor,
    line:{...properties.line},
    fillColorScheme:properties.fillColorScheme,
    fillPattern:properties.fillPattern,
    fillGradient:properties.fillGradient,
    
  }
  console.log("properties",properties)
  return fillProp
}

export const getBarWidthJSON = (properties:any, layout:any) => {
  const barJSON = {
    width: properties.width,
    bargroupgap:layout.bargroupgap,
    barWidth:properties.barWidth
  }

  return barJSON
}

export const getPieSlicesJSON = ( properties:any) => {
  const pieSlicesJSON = {
    rotation: properties.rotation,
    pull: [...properties.pull],
    explode:properties.explode,
    sliceIndex:properties.sliceIndex,
  }

  return pieSlicesJSON
}


export const getBoxOptionsJSON = ( properties:any) => {
 const boxProp = {
    line:{...properties.line},
    boxmean:properties.boxmean,
    whiskerwidth:properties.whiskerwidth,
    meanstyle: {...properties.meanstyle},
    outlierType: properties.outlierType
 }
 return boxProp
}

export const getErrorBarsJSON = (layout:Object, properties:Object) => {

}

export const getContourFillsJSON = (layout:Object, properties:Object) => {

}

export const getContourScaleJSON = (layout:Object, properties:Object) => {

}

export const getContourLabelsJSON = (layout:Object, properties:Object) => {

}

export const getContourDetailsJSON = (layout:Object, properties:Object) => {

}

export const getVectorJSON = (layout:Object, properties:Object) => {

}

export const getForestPlotJSON = (layout:Object, properties:Object) => {

}

export const getRegressionPlotJSON = (layout:Object, properties:any) => {
  const regressionData = JSON.parse(JSON.stringify(properties.regressionProp))

  return regressionData
}

export const getLocationJSON = (properties:any) => {
  const locationJSON = {
    locationmode: properties.locationmode
  }

  return locationJSON;
}

