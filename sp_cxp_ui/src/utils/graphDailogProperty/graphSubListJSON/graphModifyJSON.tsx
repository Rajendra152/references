export const getLegendsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
    showlegend: newProp.showlegend,
    legend: JSON.parse(JSON.stringify(newProp.legend))
  }

  const modifiedProperties = {
    ...properties,
  }

  if(modifiedProperties.type=='heatmap' || modifiedProperties.type == 'choropleth'){
    modifiedProperties.showscale = newProp.showlegend ? false : true
  }

  return [modifiedLayout, modifiedProperties]

}

export const getLegendsItemModifiedJSON = (newProp: any, properties: any, layout: any) => {
  console.log("-----------",newProp)
  const modifiedLayout = {
    ...layout,
    legend: JSON.parse(JSON.stringify(newProp.legend))
  }

  const modifiedProperties = {
    ...properties,
    traceDetails: JSON.parse(JSON.stringify(newProp.traceDetails))
  }

  return [modifiedLayout, modifiedProperties]

}

export const getGridModifiedJSON = (newProp: any, properties: any, layout: any) => {
  let newLayout = {}
  console.log("newProp",newProp)
  
  if (layout.hasOwnProperty("ternary")) {
    newLayout = {
      ...layout,
      ternary: {
        aaxis: {
          ...layout.ternary.aaxis,
          ...newProp.x_major
        },
        baxis: {
          ...layout.ternary.baxis,
          ...newProp.y_major
        },
        caxis: {
          ...layout.ternary.caxis,
          ...newProp.z_major

        }
      }

    }
  }
  else if (layout.hasOwnProperty("geo")) {
    newLayout = {
      ...layout,
      geo: {
        ...layout.geo,
        lataxis: {
          ...layout.geo.lataxis,
          ...newProp.x_major
        },
        lonaxis: {
          ...layout.geo.lonaxis,
          ...newProp.y_major
        },
      }

    }
  }
  else if (layout.hasOwnProperty('scene')) {
    newLayout = {
      ...layout,
      scene: {
        xaxis: {
          ...layout.scene.xaxis,
          ...newProp.x_major
        },
        yaxis: {
          ...layout.scene.yaxis,
          ...newProp.y_major
        },
        zaxis: {
          ...layout.scene.zaxis,
          ...newProp.z_major

        }
      }

    }

  }
  else if (layout.hasOwnProperty('polar')) {
    newLayout = {
      ...layout,
      polar:{
        ...layout.polar,
        radialaxis: {
          ...layout.polar.radialaxis,
          ...newProp.x_major
        },
        angularaxis: {
          ...layout.polar.angularaxis,
          ...newProp.y_major
        }
      }
      
    }
    console.log("newLayout",newLayout)
  }
  else {
    newLayout = {
      ...layout,
      xaxis: {
        ...layout.xaxis,
        ...newProp.x_major
      },
      yaxis: {
        ...layout.yaxis,
        ...newProp.y_major
      }
    }
  }


  const newProperties = {
    ...properties,
  }

  return [newLayout, newProperties]
}

export const getGraphPlanesModifiedJSON = (newProp: any, properties: any, layout: any,currPlane?:any) => {
  let modifiedLayout = {}
  if (layout.hasOwnProperty("ternary")) {
    modifiedLayout = {
      ...layout,
      ternary: {
        ...layout.ternary,
        bgcolor: newProp.plot_bgcolor,
      },
    }
  }
  if (layout.hasOwnProperty("geo")) {
    modifiedLayout = {
      ...layout,
      geo: {
        ...layout.geo,
        bgcolor: newProp.plot_bgcolor,
      },
    }
  }
  else if (layout.hasOwnProperty('scene')) {
    modifiedLayout = {
      ...layout,
      scene : {
        ...layout.scene,
        bgcolor:newProp.plot_bgcolor==='white ' ? 'white':newProp.plot_bgcolor,
    }
    }
  }
  else if (layout.hasOwnProperty('polar')) {
    modifiedLayout = {
      ...layout,
      polar:{
        ...layout.polar,
        bgcolor: newProp.plot_bgcolor,
      }
    }
  }
  else {
    modifiedLayout = {
      ...layout,
      plot_bgcolor: newProp.plot_bgcolor,
    }
  }


  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getFrameLinesModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getRotationModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getGrid_FillsModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getChoroModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
    geo:{
      ...layout.geo,
      ...newProp
    }
  }

  const modifiedProperties = {
    ...properties,
  }

  return [modifiedLayout, modifiedProperties]
}

export const getLocationModifiedJSON = (newProp: any, properties: any, layout: any) => {
  const modifiedLayout = {
    ...layout,
  }

  const modifiedProperties = {
    ...properties,
    ...newProp
  }

  return [modifiedLayout, modifiedProperties]
}

