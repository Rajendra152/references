export const getLayout = () => {
  return {
    width: 350,
    height: 288,
    offsetX:250,
    offsetY:200,
    droplines: {
      xaxis: {
        visible: false,
        type: 'solid',
        thickness: 1,
        color: '#000000ff',
        fixedrange: true
      },
      yaxis: {
        visible: false,
        type: 'solid',
        thickness: 1,
        color: '#000000ff',
        fixedrange: true
      },
    },
    title: {
      text: '2D Graph',
      font: {
        family: 'Times New Roman',
        size: 18,
        color: '#000000ff',
      },
      yanchor:'top',
      yref:'container',
      y:1,
      pad:{
        t:5,
      }
    },
    plot_bgcolor: '#ffffffff', // Graph plabes background color
    dragmode :'drawopenpath',
    newshape_line_color :'cyan',
    /* Legend properties */
    showlegend: true,
    legend: {
      bgcolor: '#ffffffff',
      bordercolor: '#000000ff',
      borderwidth: 1,
      columns: 1,
      hidetoggle: false,
      isYOnly:false,
      font: {
        family: 'Times New Roman',
        size: 10,
        color: '#000000ff',
        underline:false
      },
      orientation: 'v',
      traceorder: 'normal',
      // tracegroupgap:10,
      // itemsizing: 'constant',
      itemwidth: 30,
      // y:-0.3,
      x:1.25,
      //xanchor:'left',
      //y:-2,
      //yanchor:'bottom',
      // valign:'bottom',
      bgopacity:0.5,
      title: {
        text: '',
        font: {
          family: 'Times New Roman',
          size: 9,
          color: '#000000ff',
        },
      },
    },

    /* Marhin properties */
    margin: {
      autoexpand:true,
      l: 70,
      r: 70,
      b: 40,
      t: 40,
    },

    // polar: {
    //   radialaxis: {
    //     visible: false, range: [0, 10]
    //   }
    // },
    // barmode: 'group', // ‘stack’,
    bargap: 0.15,
    bargroupgap: 0.1,

    // dragmode: 'drawrect',

  };

};

export const getChoroLayout = () => {
  return {
    width: 350,
    height: 288,
    offsetX:250,
    offsetY:300,
    droplines: {
      xaxis: {
        visible: false,
        type: 'solid',
        thickness: 1,
        color: 'black',
        fixedrange: true
      },
      yaxis: {
        visible: false,
        type: 'solid',
        thickness: 1,
        color: 'black',
        fixedrange: true
      },
    },
    title: {
      text: '2D Graph',
      font: {
        family: 'Times New Roman',
        size: 18,
        color: '#000000ff',
      },
    },
    plot_bgcolor: '#ffffffff', // Graph plabes background color

    /* Legend properties */
    showlegend: false,
    legend: {
      bgcolor: '#ffffffff',
      bordercolor: '#000000ff',
      borderwidth: 1,
      columns: 1,
      hidetoggle: false,
      isYOnly:false,
      font: {
        family: 'Times New Roman',
        size: 10,
        color: '#000000ff',
        underline:false
      },
      orientation: 'v',
      traceorder: 'normal',
      // tracegroupgap:10,
      // itemsizing: 'constant',
      itemwidth: 30,
      // y:-0.3,
      x:1.15,
      //xanchor:'left',
      //y:-2,
      //yanchor:'bottom',
      // valign:'bottom',
      bgopacity:0.5,
      title: {
        text: '',
        font: {
          family: 'Times New Roman',
          size: 9,
          color: '#000000ff',
        },
        side: 'top',
      },
    },

    margin: {
      l: 30,
      r: 30,
      b: 30,
      t: 30,
    },

    dragmode: 'pan',
    geo:{
      // visible:false,
      scope:'world', // "africa" | "asia" | "europe" | "north america" | "south america" | "usa" | "world" )
      bgcolor	:	'#ffffffff',
      projection:{
        // type	:	'albers usa',
        scale: 1,
      },
      showlakes:false,
      lonaxis:{
        showgrid:false,
        gridwidth	:	1,        
        gridcolor	:'#b3b3b3ff',
        gridStyle: 'none'
      },
      lataxis:{
        showgrid:false,
        gridwidth	:	1,        
        gridcolor	:'#b3b3b3ff',
        gridStyle: 'none'
      },
      title: {
        text: 'Geo Data',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        // standoff: 10,
      },
    }

  };

};


export const getProperties = () => {
  return {
    type: '',
    mode: 'none',
    // coloraxis:'blue',
    // color:'red',
    // contours:{
    // coloring:'fill',
    // type:'constraint'
    // },
    // facecolor:'yellow',
    // text: 'sample',
    data: {

    },
    marker: {
      symbol: 'circle',
      color: '#000000ff',
      opacity: 1,
      outliercolor: '#000000ff',
      colorscale:'none',
      size: 5,
      line: {
        width: 1,
        color: '#000000ff',
        colorscale:'none',
      },
      pattern: {

      },
    },
    line: {
      color: '#000000ff',
      colorscheme:'none',
      width: 1,
      shape: 'linear',
      smoothing: 1,
      dash: 'solid',
      opacity: 1
    },
    refLine: {
      specification: 'none',
      opacity: 1,
      color:'#000',
      dash: 'solid',
      width: 0.5,
      layer: 'behind',
      axis: 3,
      gapColor: '',
      flag: false
    },
    // fill: 'none', //tozeroy
    // fillcolor: '',
    fillColorScheme: 'none',
    fillPattern:"none",
    fillGradient:"none"
  };
};

export const getChoroPlethProperties = () => {
  return {
    visible:true,
    type	:	'choropleth',
    locationmode	:	'USA-states', //'USA-states' 'country names'
    marker:{
      line:{
        color: '#000000ff',
        width:1
      }
    },
    showlegend	:		true,
    autocolorscale:true,
    showscale	:true
  }
}

export const getRegressionProperties = () => {
  return {
    type: 'scatter',
    mode: 'lines',
    line: {
      color: '#000000ff',
      width: 1,
      shape: 'linear',
      smoothing: 0,
      dash: 'solid',
      opacity: 1,
    },
  }
}

export const get2dAxisLayout = () => {
  return {
    yaxis: {
      visible: true,
      fixedrange: true,
      title: {
        text: 'Y Data',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        // standoff: 10,
      },

      /* grid properties */
      showgrid: false,
      gridcolor: '#000000ff',
      gridwidth: 1,
      gridStyle: "none",
      /* position of axis */
      // anchor: 'free',
      // overlaying: 'y',
      // side: 'left',
      // position: 0,

      /* scaling */
      type: '-',
      autorange: true,
      // range: [1, 20],

      /* tick labels */
      showticklabels: true,
      tickfont: {
        family: 'Times New Roman',
        size: 13,
        color: '#000000ff',
      },
      tickprefix: '',
      showtickprefix: 'all',
      ticksuffix: '',
      showticksuffix: 'all',
      tickangle: 0,

      /* tick properties */
      ticks: 'outside',
      ticklen: 3,
      tickwidth: 1,
      tickcolor: '#000000ff',

      /* tick intervals */
      tickmode: 'auto', // auto | linear | array
      // nticks: 5, // number of ticks
      tick0: 0, // start of the tick
      dtick: 1, // interval between ticks
      // tickvals: [1,2,3,4,5],
      // ticktext: [1,2,3,4,5],

      /* layout properties*/
      showline: true,
      zeroline: false,
      rangemode: 'tozero',

      /* axis line properties */
      linecolor: '#000000ff',
      linewidth: 1,
      lineopacity: 1,
      mirror: true,
      side: 'left',

      /* droplines on hover */
      // hovermode:'closest',
      showspikes: false,
      spikecolor: '#000000ff',
      spikethickness: 1,
      spikedash: 'solid',
      spikesnap: 'data',

      showexponent: 'all',
      minexponent: 3,
      exponentformat: 'power'
    },

    xaxis: {
      visible: true,
      fixedrange: true,
      title: {
        text: 'X Data',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
      },

      /* grid properties */
      showgrid: false,
      gridcolor: '#000000ff',
      gridwidth: 1,
      gridStyle: "none",
      /* position of axis */
      // anchor: 'free',
      // overlaying: 'x',
      // side: 'bottom',
      // position: 0,

      /* scaling */
      type: '-',
      // range: [0,10],

      /* tick labels */
      showticklabels: true,
      tickfont: {
        family: 'Times New Roman',
        size: 13,
        color: '#000000ff',
      },
      tickprefix: '',
      showtickprefix: 'all',
      ticksuffix: '',
      showticksuffix: 'all',
      tickangle: 0,

      /* tick properties */
      ticks: 'outside',
      ticklen: 3,
      tickwidth: 1,
      tickcolor: '#000000ff',

      /* tick intervals */
      tickmode: 'auto', // auto | linear | array
      // nticks: 5, // number of ticks
      tick0: 0, // start of the tick
      dtick: 1, // interval between ticks
      // tickvals: [1,2,3,4,5],
      // ticktext: [1,2,3,4,5],

      /* layout properties*/
      showline: true,
      zeroline: false,
      rangemode: 'tozero',

      /* axis line properties */
      linecolor: '#000000ff',
      linewidth: 1,
      lineopacity: 1,
      mirror: true,
      side: 'bottom',


      /* droplines on hover */
      // hovermode:'closest',
      showspikes: false,
      spikecolor: '#000000ff',
      spikethickness: 1,
      spikedash: 'solid',
      spikesnap: 'data',

      showexponent: 'all',
      minexponent: 3,
      exponentformat: 'power'

    },
  }
}
export const get2dAdditionalYAxis = () => {
  return {
    yaxis2: {
      visible: true,
      fixedrange: true,
      title: {
        text: 'Y Axis 2',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        // standoff: 10,
      },

      /* grid properties */
      showgrid: false,
      gridcolor: '#000000ff',
      gridwidth: 1,
      gridStyle: "none",
      /* position of axis */
      // anchor: 'free',
      overlaying: 'y',
      side: 'left',
      // position: 0,

      /* scaling */
      type: 'linear',
      autorange: true,
      range: [1, 20],

      /* tick labels */
      showticklabels: true,
      tickfont: {
        family: 'Times New Roman',
        size: 13,
        color: '#000000ff',
      },
      tickprefix: '',
      showtickprefix: 'all',
      ticksuffix: '',
      showticksuffix: 'all',
      tickangle: 0,

      /* tick properties */
      ticks: 'outside',
      ticklen: 3,
      tickwidth: 1,
      tickcolor: '#000000ff',

      /* tick intervals */
      tickmode: 'auto', // auto | linear | array
      // nticks: 5, // number of ticks
      tick0: 0, // start of the tick
      dtick: 1, // interval between ticks
      // tickvals: [1,2,3,4,5],
      // ticktext: [1,2,3,4,5],

      /* layout properties*/
      showline: true,
      zeroline: false,
      rangemode: 'tozero',

      /* axis line properties */
      linecolor: '#000000ff',
      linewidth: 1,
      lineopacity: 1,
      mirror: true,

      /* droplines on hover */
      // hovermode:'closest',
      showspikes: false,
      spikecolor: '#000000ff',
      spikethickness: 1,
      spikedash: 'solid',
      spikesnap: 'data',

      showexponent: 'all',
      minexponent: 3,
      exponentformat: 'power'
    },
  }
}
export const get2dAdditionalXAxis = () => {
  return {
    xaxis2: {
      visible: true,
      fixedrange: true,
      title: {
        text: 'X Axis 2',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
      },

      /* grid properties */
      showgrid: false,
      gridcolor: '#000000ff',
      gridwidth: 1,
      gridStyle: "none",
      /* position of axis */
      // anchor: 'free',
      overlaying: 'x',
      side: 'bottom',
      // position: 0,

      /* scaling */
      type: '-',
      // range: [0,10],

      /* tick labels */
      showticklabels: true,
      tickfont: {
        family: 'Times New Roman',
        size: 13,
        color: '#000000ff',
      },
      tickprefix: '',
      showtickprefix: 'all',
      ticksuffix: '',
      showticksuffix: 'all',
      tickangle: 0,

      /* tick properties */
      ticks: 'outside',
      ticklen: 3,
      tickwidth: 1,
      tickcolor: '#000000ff',

      /* tick intervals */
      tickmode: 'auto', // auto | linear | array
      // nticks: 5, // number of ticks
      tick0: 0, // start of the tick
      dtick: 1, // interval between ticks
      // tickvals: [1,2,3,4,5],
      // ticktext: [1,2,3,4,5],

      /* layout properties*/
      showline: true,
      zeroline: false,
      rangemode: 'tozero',

      /* axis line properties */
      linecolor: '#000000ff',
      linewidth: 1,
      lineopacity: 1,
      mirror: true,
      side: 'bottom',


      /* droplines on hover */
      // hovermode:'closest',
      showspikes: false,
      spikecolor: '#000000ff',
      spikethickness: 1,
      spikedash: 'solid',
      spikesnap: 'data',

      showexponent: 'all',
      minexponent: 3,
      exponentformat: 'power'

    },
  }
}

export const getTernaryAxisLayout = () => {
  return {
    ternary: {
      bgcolor: 'none',
      aaxis: {
        visible: true,
        title: {
          text: 'X Data',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
          // standoff: 10,
        },

        /* grid properties */
        showgrid: false,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "none",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'y',
        // side: 'left',
        // position: 0,

        /* scaling */
        type: 'linear',
        autorange: true,
        range: [1, 20],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',

        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'
      },

      baxis: {
        visible: true,
        title: {
          text: 'Y Data',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: false,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "none",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        type: '-',
        // range: [0,10],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',


        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      },
      caxis: {
        visible: true,
        title: {
          text: 'Z Data',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: false,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "none",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        type: '-',
        // range: [0,10],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',


        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      },
    }
  }
}

export const get3dAxisLayout = () => {
  return {
    width: 350,
    height: 288,
    offsetX:250,
    offsetY:200,
    margin: {
      l: 30,
      r: 30,
      b: 30,
      t: 30,
      pad:0,
      autoexpand:true
    },
    autosize:true,
    scene: {
      bgcolor: 'none',

      // nothing really changed
      // aspectmode: "auto",
      // aspectratio:{
      //   x: 1.0000000000000002,
      //   y: 1.0000000000000002,
      //   z: 1.0000000000000002,
      // },

      // uirevision:300,   // made the scatter spread
      // add some more property like camera 
      // if changed graph didnt come
      camera: {
        center:{
          x:0,
          y:0,
          z:0
        },
        eye: {
          // x: -2.162481669340103,
          // y: 0.09868378122080255,
          // z: -0.037875336196630804,
          x: -0.04214288675608174,
          y: 2.147849571634048,
          z: 0.26919545822190294,
        },    
        projection: {
          type: "perspective",
        },
        up:{
          x: 0,
          y: 0,
          z: 1,
        }
      },
      xaxis: {
        backgroundcolor: 'none',
        color: '#000000ff',
        visible: true,
        title: {
          text: 'X Data',
          font: {
            family: 'Times New Roman',
            size: 8,
            color: '#000000ff',
          },
          // standoff: 10,
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "solid",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'y',
        // side: 'left',
        // position: 0,

        /* scaling */
        type: 'linear',
        autorange: true,
        range: [1, 20],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 8,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',
        // have to check
        lineStyle: "none",
        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'
      },

      yaxis: {
        backgroundcolor: 'none',
        visible: true,
        fixedrange: true,
        title: {
          text: 'Y Data',
          font: {
            family: 'Times New Roman',
            size: 8,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "solid",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        type: '-',
        autorange: true,
        range: [1, 20],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 8,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',
        // have to check
        lineStyle: "none",

        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      },
      zaxis: {
        visible: true,
        backgroundcolor: 'none',
        title: {
          text: 'Z Data',
          font: {
            family: 'Times New Roman',
            size: 8,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "solid",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        type: '-',
        autorange: true,
        range: [1, 20],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 8,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',
        // have to check
        lineStyle: "none",


        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      },
    }
  }
}

export const getPolarAxisLayout = () => {
  return {
    graphType: 'polarPlot',
    polar: {
      radialaxis: {
        visible: true,
        type: '-',
        autorange: true,
        angle: "0",
        side: 'counterclockwise',
        title: {
          text: 'Radial Data',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "solid",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        // range: [0,10],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,


        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      },
      sector: [0, 360],
      bgcolor: 'none',
      angularaxis: {
        visible: true,
        thetaunit: 'degrees',
        rotation: "0",
        direction: 'counterclockwise',
        title: {
          text: 'Angular Data',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "solid",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        type: 'linear',
        period: "360",

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: true,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,


        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      }

    },
  }
}

export const getRadarAxisLayout = () => {
  return {
    graphType: 'radarPlot',
    polar: {
      angularaxis: {
        type: 'category',
        visible: true,
        title: {
          text: 'Angular Data',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "none",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        // side: 'bottom',
        // position: 0,

        /* scaling */
        // range: [0,10],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',


        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      },
      bgcolor: 'none',
      gridshape: 'linear',
      sector: [0, 360],
      radialaxis: {
        visible: true,
        range: [0, 10],
        title: {
          text: 'Radar Axis',
          font: {
            family: 'Times New Roman',
            size: 13,
            color: '#000000ff',
          },
        },

        /* grid properties */
        showgrid: true,
        gridcolor: '#000000ff',
        gridwidth: 1,
        gridStyle: "none",
        /* position of axis */
        // anchor: 'free',
        // overlaying: 'x',
        side: 'clockwise',
        // position: 0,

        /* scaling */
        type: '-',
        // range: [0,10],

        /* tick labels */
        showticklabels: true,
        tickfont: {
          family: 'Times New Roman',
          size: 13,
          color: '#000000ff',
        },
        tickprefix: '',
        showtickprefix: 'all',
        ticksuffix: '',
        showticksuffix: 'all',
        tickangle: 0,

        /* tick properties */
        ticks: 'outside',
        ticklen: 3,
        tickwidth: 1,
        tickcolor: '#000000ff',

        /* tick intervals */
        tickmode: 'auto', // auto | linear | array
        // nticks: 5, // number of ticks
        tick0: 0, // start of the tick
        dtick: 1, // interval between ticks
        // tickvals: [1,2,3,4,5],
        // ticktext: [1,2,3,4,5],

        /* layout properties*/
        showline: true,
        zeroline: false,
        rangemode: 'tozero',

        /* axis line properties */
        linecolor: '#000000ff',
        linewidth: 1,
        lineopacity: 1,
        mirror: true,
        side: 'bottom',
        angle: 0,

        /* droplines on hover */
        // hovermode:'closest',
        showspikes: false,
        spikecolor: '#000000ff',
        spikethickness: 1,
        spikedash: 'solid',
        spikesnap: 'data',

        showexponent: 'all',
        minexponent: 3,
        exponentformat: 'power'

      }
    },
  }
}