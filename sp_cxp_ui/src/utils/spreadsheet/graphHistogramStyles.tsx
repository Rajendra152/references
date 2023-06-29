let graphOptions = [
  {
    name: 'Vertical Bar',
    body: {
      graphType: 'vertical_bar_plot',
      subGraphType: 'simpleBar',
      format: 'XYpair',
      data: {
        x: [],
        y: [],
      },
    },
  },
  {
    name: 'Vertical Needle',
    body: {
      graphType: 'vertical_bar_plot',
      subGraphType: 'simpleBar',
      format: 'XYpair',
      data: {
        x: [],
        y: [],
      },
    },
  },
  {
    name: 'Vertical Step',
    body: {
      data: {
        x: [],
        y: [],
      },

      format: 'XYpair',
      graphType: 'line',
      subGraphType: 'simpleHorizontalMidpointStep',
    },
  },
  {
    name: 'Horizontal Bar',
    body: {
      data: {
        x: [],
        y: [],
      },
      format: 'YXpair',
      graphType: 'horizontal_bar_plot',
      subGraphType: 'simple_horizontal_bar',
    },
  },
  {
    name: 'Horizontal Needle',
    body: {
      data: {
        x: [],
        y: [],
      },
      format: 'YXpair',
      graphType: 'horizontal_bar_plot',
      subGraphType: 'simple_horizontal_bar',
    },
  },
  {
    name: 'Horizontal Step',
    body: {
      data: {
        x: [],
        y: [],
      },
      format: 'XYpair',
      graphType: 'line',
      subGraphType: 'simpleVerticalMidpointStep',
    },
  },
];


const graphHistogram = (graphName: string) => {
    let data;
  if (graphName) {
    for (let i = 0; i < graphOptions.length; i++) {
      const element = graphOptions[i];
      if (element.name.toLowerCase() == graphName.toLowerCase()) {
        data = element;
        break;
      }
    }
    return data;
    }
    return null;
}


export default graphHistogram;