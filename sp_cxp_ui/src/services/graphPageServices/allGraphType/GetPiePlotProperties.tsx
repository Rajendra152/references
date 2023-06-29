import { getProperties } from "../DefaultGraphProperties";

export const getPieProperties = ()=>{
    return {
        ...getProperties(),
        type : 'pie',
        rotation: 0,
        pull: [0,0,0,0,0,0,0,0.3,0,0],
        explode:'single',
        sliceIndex:0,
        data:{
            values:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            },
            labels:{
                isentirerange: true,
                start: 1,
                end: 10,
                gap: 3,
                missingvalues: false,
                outofrange: false,
            }
          },
        marker:{
            colors: ['#111','#444','#222','#111','#444','#222','#111','#444','#222','#000'],
            color:'none',
            opacity: 1,
            line:{
                color: 'black',
                width: 1,
                colorscale:'none'
            }
        }
    }
}
