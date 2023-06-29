export const getAxisModifiedJSON = (newProp: any, properties: any, layout: any, axis: any) => {
  console.log(newProp, axis)
  if (layout.hasOwnProperty('ternary')) {
   return getTernaryAxisModifiedJSON(newProp, properties, layout, axis)
  }
  else if (layout.hasOwnProperty('scene')) {
    return getSceneAxisModifiedJSON(newProp, properties, layout, axis)
   }
  else if (layout.graphType === 'polarPlot') {
    return getPolarAxisModifiedJSON(newProp, properties, layout, axis)
   }
  else if (layout.graphType === 'radarPlot') {
    return getRadarAxisModifiedJSON(newProp, properties, layout, axis)
   }
  else {
    let marginTop = layout.margin.t;
    if(axis=='xaxis'){
      marginTop=newProp.side=='top' ? 70 :40
    }
    const modifiedLayout = {
      ...layout,
      [axis]: {
        ...layout[axis],
        ...newProp,
      },
      margin:{
        ...layout.margin,
        t:marginTop,
      }
    }
    console.log(modifiedLayout)
    const modifiedProperties = {
      ...properties,
    }

    return [modifiedLayout, modifiedProperties]
  }
}

export const getTernaryAxisModifiedJSON = (newProp: any, properties: any, layout: any, axis: any) => {
  console.log(newProp, axis)
  const modifiedLayout = {
    ...layout,
    ternary: {
      ...layout.ternary,
      [axis]: {
        ...layout.ternary[axis],
        ...newProp,
      }
    }

  }
  console.log('modifiedLayout',modifiedLayout)
  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}


export const getSceneAxisModifiedJSON = (newProp: any, properties: any, layout: any, axis: any) => {
  console.log(newProp, axis)
  const modifiedLayout = {
    ...layout,
    scene: {
      ...layout.scene,
      [axis]: {
        ...layout.scene[axis],
        ...newProp,
      }
    }

  }
  console.log('modifiedLayout',modifiedLayout)
  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getPolarAxisModifiedJSON = (newProp: any, properties: any, layout: any, axis: any) => {
  console.log(newProp, axis)
  const modifiedLayout = {
    ...layout,
    polar: {
      ...layout.polar,
      [axis]: {
        ...layout.polar[axis],
        ...newProp,
      }
    }

  }
  console.log('modifiedLayout',modifiedLayout)
  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getPolarModifiedJSON = (newProp: any, properties: any, layout: any, axis: any) => {
  console.log(newProp, axis)
  const modifiedLayout = JSON.parse(JSON.stringify({
    ...layout,
    polar: {
      ...layout.polar,
      ...newProp,
    }

  }))
  console.log('modifiedLayout',modifiedLayout)
  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getRadarAxisModifiedJSON = (newProp: any, properties: any, layout: any, axis: any) => {
  console.log(newProp, axis)
  const modifiedLayout = {
    ...layout,
    polar: {
      ...layout.polar,
      [axis]: {
        ...layout.polar[axis],
        ...newProp,
      }
    }

  }
  console.log('modifiedLayout',modifiedLayout)
  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}


