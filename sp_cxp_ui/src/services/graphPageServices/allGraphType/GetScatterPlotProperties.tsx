import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getScatterPlotProperties = (subGraphType:string) => {
    let newProperties;
    newProperties = {
        ...getProperties(),
        type:'scatter',
        mode: 'markers',
        fill: 'none',
        fillcolor: '#ffffffff',
        data:{
            x:{
                isentirerange: true,
                start: 2,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            },
            y:{
              isentirerange: true,
              start: 3,
              end: 10,
              gap: 2,
              missingvalues: false,
              outofrange: false,
            }
          },
          layout: {
            width: 350,
            height: 288,
          }
    }

    switch (subGraphType) {
        case SUBTYPES.SIMPLE_SCATTER:
            console.log(newProperties)
            return { ...newProperties};

        case SUBTYPES.MULTIPLE_SCATTER:
            return { ...newProperties};

        case SUBTYPES.VERTICAL_POINT:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.HORIZONTAL_POINT:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.SIMPLE_ERROR_BARS:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.MULTIPLE_ERROR_BARS:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.HORIZONTAL_ERROR:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.BI_DIRECTIONAL_ERROR:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.VERTICAL_ASYM_ERROR:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.HORIZONTAL_ASYM_ERROR:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        case SUBTYPES.BI_DIREC_ASYM_ERROR:
            newProperties.marker = {
                ...newProperties.marker,
                symbol : 'hexagon-open-dot',
            }
            return newProperties;

        default:
            return newProperties
    }

}
