import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getTernaryPlotProperties = (subGraphType:string) => {
    let newProperties;
    newProperties = {
        ...getProperties(),
        type:'scatterternary',
        data:{
            a:{
                isentirerange: true,
                start: 2,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            },
            b:{
              isentirerange: true,
              start: 3,
              end: 10,
              gap: 2,
              missingvalues: false,
              outofrange: false,
            },
            c:{
                isentirerange: true,
                start: 3,
                end: 10,
                gap: 2,
                missingvalues: false,
                outofrange: false,
              }
          },
    }
    console.log(subGraphType, "subgraphtype")
    switch (subGraphType) {
        case SUBTYPES.TERNARY_SCATTER:
            console.log("hellloooo---->")
            return { ...newProperties, mode:'markers'};

        case SUBTYPES.TERNARY_LINE:
            return { ...newProperties, mode:'lines'};

        case SUBTYPES.TERNARY_LINE_SCATTER:
            return { ...newProperties, fill : 'markers+lines'};

        default:
            return newProperties
    }

}
