
import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getRadarPlotProperties = (subGraphType:string) => {
  let newProperties = {
    ...getProperties(),
    type: 'scatterpolar',
    data:{
      r: {},
      theta:{},
      error:{},
    },
    fill: 'toself',
    fillcolor: '#ffffffff',
  }

  newProperties.data = {
    ...newProperties.data,
      r:{
          isentirerange: true,
          start: 2,
          end: 10,
          gap: 3,
          missingvalues: false,
          outofrange: false,
      },
      theta:{
        isentirerange: true,
        start: 3,
        end: 10,
        gap: 2,
        missingvalues: false,
        outofrange: false,
      },
      error:{
        isentirerange: true,
        start: 3,
        end: 10,
        gap: 2,
        missingvalues: false,
        outofrange: false,
      },
      
  }
  switch (subGraphType) {
    case SUBTYPES.RADAR_SCATTER:
      return { ...newProperties, mode: 'markers', fill: 'none'}
      
    case SUBTYPES.RADAR_LINE:
      return { ...newProperties, mode: 'lines'};

    case SUBTYPES.RADAR_LINE_SCATTER:
      return { ...newProperties, mode: 'lines+markers'} 

    case SUBTYPES.RADAR_AREA:
      return { ...newProperties, fill:'toself'}

    default:
      return { ...newProperties}
  }
};
