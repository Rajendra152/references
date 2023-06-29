
import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getPolarPlotProperties = (subGraphType:string) => {
  let newProperties = getProperties();
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
      }
  }
  switch (subGraphType) {
    case SUBTYPES.POLAR_SCATTER:
        return { ...newProperties, type: 'scatterpolar',mode: 'markers', fill: 'none', }
        
  
      case SUBTYPES.POLAR_LINE:
        return { ...newProperties, type: 'scatterpolar', mode: 'lines', fill: 'none',};
  
      case SUBTYPES.POLAR_LINE_SCATTER:
        return { ...newProperties, type: 'scatterpolar', mode: 'lines+markers', fill: 'none',}

    default:
      return { ...newProperties}
  }
};
