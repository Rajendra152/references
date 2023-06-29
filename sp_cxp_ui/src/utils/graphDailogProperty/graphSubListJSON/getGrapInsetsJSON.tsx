
export const getLegendsJSON = (layout: any, properties: any) => {
  // const legendJSON = {
  //   showlegend: layout.showlegend,
  //   legend: {
  //     ...layout.showlegend.legend,
  //     font: {
  //       ...layout.showlegend.legend.font,
  //     },
  //     title: {
  //       ...layout.showlegend.legend.title,
  //       font: {
  //         ...layout.showlegend.legend.title.font,
  //       },
  //     },
  //   },
  // }
  console.log("properties properties",properties)
  const legendJSON = {
    showlegend: layout?.showlegend,
    legend: (layout?.legend)? JSON.parse(JSON.stringify(layout?.legend)) : {},
    traceDetails: (properties?.traceDetails)? JSON.parse(JSON.stringify(properties?.traceDetails)) : {}
  }

  return legendJSON;
}

export const getGridJSON = (layout: any, properties: any) => {
  let newLayout = layout
  let gridJSON: any
  if (layout.hasOwnProperty("ternary")) {
    newLayout = layout.ternary
    gridJSON = {
      x_major: {
        showgrid: newLayout.aaxis.showgrid,
        gridcolor: newLayout.aaxis.gridcolor,
        gridwidth: newLayout.aaxis.gridwidth,
        gridStyle: newLayout.aaxis.gridStyle,
        gridGapColor: "black"
      },
      y_major: {
        showgrid: newLayout.baxis.showgrid,
        gridcolor: newLayout.baxis.gridcolor,
        gridwidth: newLayout.baxis.gridwidth,
        gridStyle: newLayout.baxis.gridStyle,
        gridGapColor: "black"
      },
      z_major: {
        showgrid: newLayout.caxis.showgrid,
        gridcolor: newLayout.caxis.gridcolor,
        gridwidth: newLayout.caxis.gridwidth,
        gridStyle: newLayout.caxis.gridStyle,
        gridGapColor: "black"
      }
    }
  }
  else if (layout.hasOwnProperty("geo")) {
    newLayout = layout.geo
    gridJSON = {
      x_major: {
        showgrid: newLayout.lataxis.showgrid,
        gridcolor: newLayout.lataxis.gridcolor,
        gridwidth: newLayout.lataxis.gridwidth,
        gridStyle: newLayout.lataxis.gridStyle,
        gridGapColor: "black"
      },
      y_major: {
        showgrid: newLayout.lonaxis.showgrid,
        gridcolor: newLayout.lonaxis.gridcolor,
        gridwidth: newLayout.lonaxis.gridwidth,
        gridStyle: newLayout.lonaxis.gridStyle,
        gridGapColor: "black"
      }
    }
  }
  else if (layout.hasOwnProperty('scene')) {
    newLayout = layout.scene
    gridJSON = {
      x_major: {
        showgrid: newLayout.xaxis.showgrid,
        gridcolor: newLayout.xaxis.gridcolor,
        gridwidth: newLayout.xaxis.gridwidth,
        gridStyle: newLayout.xaxis.gridStyle,
        gridGapColor: "black"
      },
      y_major: {
        showgrid: newLayout.yaxis.showgrid,
        gridcolor: newLayout.yaxis.gridcolor,
        gridwidth: newLayout.yaxis.gridwidth,
        gridStyle: newLayout.yaxis.gridStyle,
        gridGapColor: "black"
      },
      z_major: {
        showgrid: newLayout.zaxis.showgrid,
        gridcolor: newLayout.zaxis.gridcolor,
        gridwidth: newLayout.zaxis.gridwidth,
        gridStyle: newLayout.zaxis.gridStyle,
        gridGapColor: "black"
      }
    }
  }
  else if (layout.hasOwnProperty('polar')) {
    newLayout = layout.polar
    gridJSON = {
      x_major: {
        showgrid: newLayout.radialaxis.showgrid,
        gridcolor: newLayout.radialaxis.gridcolor,
        gridwidth: newLayout.radialaxis.gridwidth,
        gridStyle: newLayout.radialaxis.gridStyle,
        gridGapColor: "black"
      },
      y_major: {
        showgrid: newLayout.angularaxis.showgrid,
        gridcolor: newLayout.angularaxis.gridcolor,
        gridwidth: newLayout.angularaxis.gridwidth,
        gridStyle: newLayout.angularaxis.gridStyle,
        gridGapColor: "black"
      }
    }
  }
  else {
    gridJSON = {
      x_major: {
        showgrid: newLayout.xaxis.showgrid,
        gridcolor: newLayout.xaxis.gridcolor,
        gridwidth: newLayout.xaxis.gridwidth,
        gridStyle: newLayout.xaxis.gridStyle,
        gridGapColor: "black"
      },
      y_major: {
        showgrid: newLayout.yaxis.showgrid,
        gridcolor: newLayout.yaxis.gridcolor,
        gridwidth: newLayout.yaxis.gridwidth,
        gridStyle: newLayout.yaxis.gridStyle,
        gridGapColor: "black"
      }
    }
  }
  return gridJSON;
}

export const getGraphPlanesJSON = (layout: any, properties: any) => {
  let newLayout = layout
  let graphPlaneJSON: any 
  if (layout.hasOwnProperty("ternary")) {
     graphPlaneJSON = {
      plot_bgcolor: layout.ternary.bgcolor,
      opacity: 1
      //transparency missing
    }
  }
  if (layout.hasOwnProperty("geo")) {
     graphPlaneJSON = {
      plot_bgcolor: layout.geo.bgcolor,
      opacity: 1
      //transparency missing
    }
  }
  else if (layout.hasOwnProperty('scene')) {
    newLayout = layout.scene
     graphPlaneJSON = {
      plot_bgcolor: layout.scene.bgcolor,
      opacity: 1
      //transparency missing
    }
  }
  else if (layout.hasOwnProperty('polar')) {
    newLayout = layout.polar
     graphPlaneJSON = {
      plot_bgcolor: newLayout.bgcolor,
      opacity: 1
      //transparency missing
    }
  }
  else {
     graphPlaneJSON = {
      plot_bgcolor: layout.plot_bgcolor,
      opacity: 1
      //transparency missing
    }
  }

  return graphPlaneJSON;
}

export const getFrameLinesJSON = (layout: any, properties: any) => {
  let newLayout = layout
  let framelineJSON: any
  if (layout.hasOwnProperty('scene')) {
    newLayout = layout.scene
    framelineJSON = {
      x_major: {
        linecolor: newLayout.xaxis.linecolor,
        linewidth: newLayout.xaxis.linewidth,
        showline: newLayout.xaxis.showline,
        lineStyle: newLayout.xaxis.gridStyle,
        side: newLayout.zaxis.side,
      },
      y_major: {
        linecolor: newLayout.yaxis.linecolor,
        linewidth: newLayout.yaxis.linewidth,
        showline: newLayout.yaxis.showline,
        lineStyle: newLayout.yaxis.gridStyle,
        side: newLayout.zaxis.side,
      },
      z_major: {
        linecolor: newLayout.zaxis.linecolor,
        linewidth: newLayout.zaxis.linewidth,
        showline: newLayout.zaxis.showline,
        lineStyle: newLayout.zaxis.gridStyle,
        side:  newLayout.zaxis.side,
      }
    }
  }
return framelineJSON;
}

export const getRotationJSON = (layout: any, properties: any) => {

}

export const getGrid_FillsJSON = (layout: any, properties: any) => {
  const newLayout = layout.polar
  const  graphPlaneJSON = {
      plot_bgcolor: newLayout.bgcolor,
      opacity: 1
      //transparency missing
    }

  return graphPlaneJSON
}

export const getGeographicJSON = (layout: any, properties: any) => {
  const newLayout = layout.geo
  const  graphPlaneJSON = {
      scope: newLayout.scope,
      projection:{
        // type	:	'albers usa',
        scale: newLayout.projection.scale,
      },
      // center:{...newLayout.center}
    }

  return graphPlaneJSON
}

