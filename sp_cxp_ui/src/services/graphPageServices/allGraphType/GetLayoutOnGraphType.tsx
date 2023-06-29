
import * as TYPES from "./GraphTypeConstants";
import { getLayout, getTernaryAxisLayout, get2dAxisLayout, get3dAxisLayout,getChoroLayout } from "../DefaultGraphProperties";
import { GetVerticalBarLayout } from "./GetVerticalBarLayout";
import { GetPolarLayoutProperties } from './GetPolarLayoutProperties';
import { GetRadarLayoutProperties } from './GetRadarLayoutProperties';


export const getLayoutByGraphType = (graphType: string, subGraphType: string) => {
  switch (graphType) {

    case TYPES.VERTICAL_BAR_PLOT:
      return GetVerticalBarLayout(subGraphType);

    case TYPES.HORIZONTAL_BAR_PLOT:
      return GetVerticalBarLayout(subGraphType);

    case TYPES.POLAR_PLOT:
      return GetPolarLayoutProperties(subGraphType);

    case TYPES.PIE_PLOT:
      return  { ...getLayout()}

    case TYPES.RADAR_PLOT:
      console.log('1')
      return GetRadarLayoutProperties(subGraphType);

    case TYPES.TERNARY_PLOT:
      console.log('terna')
      return { ...getLayout(), ...getTernaryAxisLayout() }

    case TYPES.SCATTER_3D_PLOT:
    case TYPES.LINE_3D_PLOT:
    case TYPES.BAR_3D_PLOT:
    case TYPES.MESH_3D_PLOT:
      console.log('3d')
      return { ...getLayout(), ...get3dAxisLayout() }

    case TYPES.HEATMAP:
      console.log('HeatMao')
      return { ...getLayout(), ...get2dAxisLayout(), showlegend:false }

    case TYPES.CHOROPLETH_MAP:
      console.log('Choropleth Map')
      return { ...getChoroLayout() }

    default:
      return { ...getLayout(), ...get2dAxisLayout() }
  }
};


export const getLayoutTitleByGraphType = (layout:any, properties:any, graphpage:any, resultGraphWorksheetID:any, keyName:any) => {

    let grpLength:any;

    if (properties.type == 'pie') {
      grpLength = graphpage.pieGraphLength+1;
      graphpage.pieGraphLength+=1;

      return `Pie Graph ${grpLength}`
    }
    else if (properties.type == 'contour') {
      grpLength = graphpage.contourLength+1;
      graphpage.contourLength+=1;
      return `Contour Graph ${grpLength}`
    }
    else if (layout.hasOwnProperty('ternary')) {
      // grpLength = graphpage.pieLength+1;
      // graphpage.pieLength+=1;
      return `Ternary Plot`
    }
    else if (layout.hasOwnProperty('geo')) {
      // grpLength = graphpage.pieLength+1;
      // graphpage.pieLength+=1;
      return `Choropleth Map`
    }
    else if (layout.hasOwnProperty('scene')){
      grpLength = graphpage.graph3DLength+1;
      graphpage.graph3DLength+=1;
      return `3D Graph ${grpLength}`
    }
    else if (layout.graphType==='polarPlot'){
      // grpLength = graphpage.pieLength+1;
      // graphpage.pieLength+=1;
      return `Polar Plot`
    }
    else if (layout.graphType==='radarPlot') {
      // grpLength = graphpage.pieLength+1;
      // graphpage.pieLength+=1;
      return `Radar Plot`
    }
    else if (layout.hasOwnProperty('xaxis')) {
      grpLength = graphpage.graph2DLength+1;
      graphpage.graph2DLength+=1;
      if (resultGraphWorksheetID) {
        return `${keyName}`
      } else {
        return `2D Graph ${grpLength}`
      }
    }
  
    return ''
}

