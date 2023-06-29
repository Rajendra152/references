import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getAreaPlotProperties = (subGraphType:string) => {
    let newProperties;
    newProperties = {
        ...getProperties(),
        mode:'none',
        type: 'area',
        fillcolor:'#e6e6e6ff',
        data:{
            x:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 2,
                missingvalues: false,
                outofrange: false,
            },
            y:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 2,
                missingvalues: false,
                outofrange: false,
            },
        },
    }
    switch (subGraphType) {
        case SUBTYPES.SIMPLE_AREA:
            return { ...newProperties, fill : 'tozeroy'};

        case SUBTYPES.MULTIPLE_AREA:
            return { ...newProperties, fill : 'tozeroy'};

        case SUBTYPES.MULTIPLE_VERTICAL_AREA:
            return { ...newProperties, fill : 'tozerox'};

        case SUBTYPES.SIMPLE_VERTICAL_AREA:
            return { ...newProperties, fill : 'tozerox'};

        case SUBTYPES.COMPLEX_AREA:
            return newProperties;

        default:
            return newProperties
    }

}
