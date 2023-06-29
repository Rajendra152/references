import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getBoxProperties = (subGraphType: string) => {
    let newProperties;
    newProperties = {
        ...getProperties(),
        type: 'box',
        boxpoints: 'outliers',
        data: {
            x: {
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 2,
                missingvalues: false,
                outofrange: false,
            },
            y: {
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 2,
                missingvalues: false,
                outofrange: false,
            },
        },
        fillcolor: '#e6e6e6ff',
        meanstyle: {
            meancolor: 'green',
            meanpad: 'solid',
            meanwidth: 2,
            meanopacity: 1,
            meangapcolor: '#fff',
            meanalign: 'center',
          },
        //notched: true,
        // notchwidth: 0.25, 
        whiskerwidth: 0.5,
        width: 0.5,
        barWidth:0.5,
        outlierType: 'all'
    }
    switch (subGraphType) {

        case SUBTYPES.VERTICAL_BOX:
            return newProperties;

        case SUBTYPES.HORIZONTAL_BOX:
            return newProperties;

        default:
            return newProperties;
    }
}

