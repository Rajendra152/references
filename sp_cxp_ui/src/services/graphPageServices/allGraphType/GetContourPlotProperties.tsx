import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getContourPlotProperties = (subGraphType:string) => {
    console.log(subGraphType, "subgraphType")
    let newProperties;
    newProperties = {
        ...getProperties(),
         type:'contour',
        showscale: false,
        colorscale:'Cividis',
        data:{
            x:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            },
            y:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            },
            z:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            },
          },
        }
    switch (subGraphType) {
        case SUBTYPES.SIMPLE_CONTOUR:
            return { ...newProperties, contours:{
                coloring: 'none',
                showlabels: true,
              }
            };

        case SUBTYPES.FILLED_CONTOUR:
            return { ...newProperties, contours: {
                coloring: 'fill',
                showlabels: true,
              }};

        default:
            return newProperties
    }

}
