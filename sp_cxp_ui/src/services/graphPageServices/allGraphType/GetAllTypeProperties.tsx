import * as TYPES from "./GraphTypeConstants";
import { getProperties, getChoroPlethProperties } from "../DefaultGraphProperties";
import { getLinePlotProperties } from "./GetLinePlotProperties";
import { getPieProperties } from "./GetPiePlotProperties";
import { getBoxProperties } from "./GetBoxProperties";
import { getPolarPlotProperties } from './GetPolarPlotProperties';
import { getRadarPlotProperties } from "./GetRadarPlotProperties";
import { getBarProperties } from "./GetBarProperties";
import { getAreaPlotProperties } from './GetAreaPlotProperties';
import { getTernaryPlotProperties } from './GetTernaryPlotProperties';
import { getContourPlotProperties } from './GetContourPlotProperties';
import { getScatterPlotProperties } from './GetScatterPlotProperties';
import { graphTypes } from "../../../components/RibbonMenu/GraphWizard/SampleData";
import { getLineScatterPlotProperties } from "./GetLineScatterProperties";

export const getPropertiesByGraphType = (graphType: string, subGraphType: string) => {
  console.log(graphType, "graphtypes")
  switch (graphType) {

    case TYPES.SCATTER_PLOT:
      return { ...getScatterPlotProperties(subGraphType) };

    case TYPES.LINE_PLOT:
      return getLinePlotProperties(subGraphType);

    case TYPES.LINE_SCATTER_PLOT:
      return getLineScatterPlotProperties(subGraphType);

    case TYPES.VECTOR_PLOT:
      return { ...getProperties(), mode: 'lines+markers' };

    case TYPES.BUBBLE_PLOT:
      return { ...getScatterPlotProperties(TYPES.BUBBLE_PLOT) };

    case TYPES.AREA_PLOT:
      return { ...getAreaPlotProperties(subGraphType) };

    case TYPES.POLAR_PLOT:
      return { ...getPolarPlotProperties(subGraphType) };

    case TYPES.RADAR_PLOT:
      return { ...getRadarPlotProperties(subGraphType) };

    case TYPES.TERNARY_PLOT:
      return { ...getTernaryPlotProperties(subGraphType) }

    case TYPES.VERTICAL_BAR_PLOT:
      return getBarProperties(subGraphType);

    case TYPES.HORIZONTAL_BAR_PLOT:
      console.log("INSIDE HORIZONTAL")
      return getBarProperties(subGraphType);

    case TYPES.BOX_PLOT:
      return { ...getBoxProperties(subGraphType) };

    case TYPES.PIE_PLOT:
      return { ...getPieProperties() };

    case TYPES.CONTOUR_PLOT:
      console.log("in countour", graphType)
      return { ...getContourPlotProperties(subGraphType) };

    case TYPES.LINE_3D_PLOT:
      return { ...getProperties(),...getDataProperties(), mode: 'lines', type: 'scatter3d', }

    case TYPES.SCATTER_3D_PLOT:
      return { ...getProperties(),...getDataProperties(), mode: 'markers', type: 'scatter3d' }

    case TYPES.MESH_3D_PLOT:
      console.log("mesh3D", graphType)
      return { ...getProperties(),...getDataProperties(), type: 'mesh3d', }
      
    case TYPES.HEATMAP:
      console.log("heatmap", graphType)
      return { ...getProperties(),...getDataProperties(), type: 'heatmap',showscale:true, autocolorscale:true }

    case TYPES.CHOROPLETH_MAP:
      console.log("choroplethMap", graphType)
      return { ...getChoroPlethProperties(),...getChoroplethDataProperties()}
  

    default:
      return { ...getProperties() }
  }
};

const getDataProperties = () => {
  return {
    data: {
      x: {
        isentirerange: true,
        start: 1,
        end: 10,
        gap: 3,
        missingvalues: false,
        outofrange: false,
      },
      y: {
        isentirerange: true,
        start: 1,
        end: 10,
        gap: 3,
        missingvalues: false,
        outofrange: false,
      },
      z: {
        isentirerange: true,
        start: 1,
        end: 10,
        gap: 3,
        missingvalues: false,
        outofrange: false,
      }
    }
  }
}

const getChoroplethDataProperties = () => {
  return {
    data: {
      locations: {
        isentirerange: true,
        start: 1,
        end: 10,
        gap: 3,
        missingvalues: false,
        outofrange: false,
      },
      z: {
        isentirerange: true,
        start: 1,
        end: 10,
        gap: 3,
        missingvalues: false,
        outofrange: false,
      }
    }
  }
}