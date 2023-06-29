export const getLayout = () => {
  return {
    width: 600,
    height: 400,
    title: '2D Graph',
    plot_bgcolor: 'white', // Graph plabes background color

    /* Legend properties */
    showlegend: true,
    legend: {
      bgcolor: 'white',
      bordercolor: 'black',
      borderwidth: 1,
      font: {
        family: 'Open Sans',
        size: 10,
        color: 'black',
      },
      orientation: 'v',
      traceorder: 'normal',
      // tracegroupgap:10,
      // itemsizing: 'constant',
      // itemwidth: 20,
      // x:1,
      // xanchor:'right',
      // y:1,
      // yanchor:'middle',
      // valign:'bottom',
      title: {
        text: '',
        font: {
          family: 'Open Sans',
          size: 9,
          color: 'black',
        },
        side: 'top',
      },
    },

    /* Marhin properties */
    margin: {
      l: 120,
      r: 40,
      b: 50,
      t: 80,
    },

    yaxis: {
      visible: true,
      title: {
        text: 'Y Data',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: 'black',
        },
        // standoff: 10,
      },

      /* grid properties */
      showgrid: true,
      gridcolor: 'grey',
      gridwidth: 1,

      /* position of axis */
      anchor: 'free',
      overlaying: 'y',
      side: 'left',
      position: 0,

      /* scaling */
      type: '-',
      // range: [0,10],

      /* tick labels */
      showticklabels: true,
      tickfont: {
        family: 'Times New Roman',
        size: 13,
        color: 'black',
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
      tickcolor: 'black',

      /* tick intervals */
      tickmode: 'linear', // auto | linear | array
      // nticks: 5, // number of ticks
      tick0: 0, // start of the tick
      dtick: 20, // interval between ticks
      // tickvals: [1,2,3,4,5],
      // ticktext: [1,2,3,4,5],

      /* layout properties*/
      showline: true,
      zeroline: false,
      rangemode: 'tozero',

      /* droplines on hover */
      // hovermode:'closest',
      showspikes: true,
      spikecolor: 'black',
      spikethickness: 1,
      spikedash: 'solid',
      spikesnap: 'data',
    },

    xaxis: {
      visible: true,
      title: {
        text: 'X Data',
        font: {
          family: 'Times New Roman',
          size: 13,
          color: 'black',
        },
      },

      /* grid properties */
      showgrid: true,
      gridcolor: 'grey',
      gridwidth: 1,

      /* position of axis */
      anchor: 'free',
      overlaying: 'x',
      side: 'bottom',
      position: 0,

      /* scaling */
      type: '-',
      // range: [0,10],

      /* tick labels */
      showticklabels: true,
      tickfont: {
        family: 'Times New Roman',
        size: 13,
        color: 'black',
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
      tickcolor: 'green',

      /* tick intervals */
      tickmode: 'linear', // auto | linear | array
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
      linecolor: 'black',
      linewidth: 1,
      lineopacity: 0.2,
      mirror: false,

      /* droplines on hover */
      // hovermode:'closest',
      showspikes: true,
      spikecolor: 'black',
      spikethickness: 1,
      spikedash: 'solid',
      spikesnap: 'data',
    },
    dragmode: 'drawrect',
  };
};

export const getProperties = () => {
  return {
    // mode: 'markers+lines',
    mode: 'markers',
    // text: 'sample',
    marker: {
      symbol: 'circle',
      color: 'black',
      opacity: 1,
      size: 10,
      line: {
        width: 1,
        color: 'black',
      },
    },
    line: {
      color: 'black',
      width: 1,
      // shape: 'spline',
      opacity: 1,
    },
    fill: 'none', //tozeroy
    fillcolor: 'black',
  };
};
