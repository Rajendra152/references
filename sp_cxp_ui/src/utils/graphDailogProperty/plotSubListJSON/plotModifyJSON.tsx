export const getDataModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    data: { ...newProp.data }
  }

  return [modifiedLayout, modifiedProperties]

}

export const getSymbolModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const newLayout = {
    ...layout,
  }

  let newProperties = {
    ...properties,
    marker: { ...newProp.marker }
  }
  if(newProperties.type==='scatter' || newProperties.type==='scatterpolar' || newProperties.type==='scatter3d'){
    newProperties = modify2DLineSymbolMode(newProperties)
  }
  return [newLayout, newProperties]
}

export const getLinesModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  let modifiedProperties = {
    ...properties,
    line: { ...newProp.line },
  }
  if(modifiedProperties.type==='scatter'|| modifiedProperties.type==='scatterpolar' || modifiedProperties.type==='scatter3d'){
    modifiedProperties = modify2DLineSymbolMode(modifiedProperties)
  }

  return [modifiedLayout, modifiedProperties]
}


export const getAreaFillsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    ...newProp.areaFills
  }

  return [modifiedLayout, modifiedProperties]
}

export const getRefLineModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    refLine: {...newProp.line}
  }

  return [modifiedLayout, modifiedProperties]
}

export const getDropLineModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

//CS

export const get3DLineModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getFillsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  console.log("Newprops",newProp)
  const modifiedLayout = {
    ...layout,
  }
  if (properties.type == "box") {
    const modifiedProperties = {
      ...properties,
      fillcolor:newProp.color,
      line:{...newProp.line},
      fillColorScheme:newProp.fillColorScheme,
      fillPattern:newProp.fillPattern
      // ...newProp
    }
    return [modifiedLayout, modifiedProperties]
  }
  else {
    const modifiedProperties = {
      ...properties,
      marker: {
        ...newProp
      }
    }
    delete modifiedProperties.marker.fillPattern
    modifiedProperties.fillPattern=newProp.fillPattern
    return [modifiedLayout, modifiedProperties]

  }
}

export const getBarWidthModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout, 
    bargroupgap:newProp.bargroupgap
  }

  const modifiedProperties = {
    ...properties,
    width: newProp.width,
    barWidth:newProp.barWidth
  }

  return [modifiedLayout, modifiedProperties]
}

export const getPieSlicesModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    ...newProp
  }

  return [modifiedLayout, modifiedProperties]
}

export const getBoxOptionsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    ...newProp
  }

  return [modifiedLayout, modifiedProperties]
}

export const getErrorBarsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getContourFillLineModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    line:{
      ...properties.line,
      ...newProp
    }
  }

  return [modifiedLayout, modifiedProperties]
}

export const getContourFillModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    ...newProp
  }

  return [modifiedLayout, modifiedProperties]
}

export const getContourScaleModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getContourLabelsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getContourDetailsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,

  }

  return [modifiedLayout, modifiedProperties]
}

export const getVectorModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getForestModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}


export const getRegressionModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    regressionData: {
      ...newProp
    }
  }

  return [modifiedLayout, modifiedProperties]
}

const modify2DLineSymbolMode = (properties:any) => {
  if(properties.line.dash !=='none' && properties.marker.symbol !=='none'){
    properties.mode = 'markers+lines'    
  }
  else if(properties.line.dash !=='none'){
    properties.mode = 'lines'
  }
  else if(properties.marker.symbol !=='none'){
    properties.mode = 'markers'
  }
  else{
    properties.mode = 'none'
  }

  return properties
}