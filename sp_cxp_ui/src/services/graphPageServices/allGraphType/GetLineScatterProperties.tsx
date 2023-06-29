
import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getLineScatterPlotProperties = (subGraphType:string) => {
  let newProperties;
  newProperties = { 
    ...getProperties(), 
    type:'scatter',
    mode : 'markers+lines',
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
  }
  switch (subGraphType) {

    case SUBTYPES.SIMPLE_LINE_SCATTER:
      return newProperties;

    case SUBTYPES.MULTIPLE_LINE_SCATTER:
      return newProperties;

    case SUBTYPES.SIMPLE_SPLINE_CURVE_LINE_SCATTER:
      newProperties.line = {
        ...newProperties.line,
        shape: 'spline',
      }
      return newProperties;

    case SUBTYPES.MULTIPLE_SPLINE_CURVE_LINE_SCATTER:
      newProperties.line = {
        ...newProperties.line,
        shape: 'spline',
      }
      return newProperties;

    case SUBTYPES.SIMPLE_LINE_SCATTER_ERROR_BAR:
        return newProperties;

    case SUBTYPES.MULTIPLE_LINE_SCATTER_ERROR_BAR:
        return newProperties;

    case SUBTYPES.HORIZONTAL_LINE_SCATTER_ERROR_BAR:
        return newProperties;

    case SUBTYPES.BIDIRECTIONAL_LINE_SCATTER_ERROR_BAR:
        return newProperties;

    case SUBTYPES.SIMPLE_VERTICAL_LINE_SCATTER_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'vh',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_VERTICAL_LINE_SCATTER_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'vh',
      }
      return newProperties

    case SUBTYPES.SIMPLE_HORIZONTAL_LINE_SCATTER_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'hv',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_HORIZONTAL_LINE_SCATTER_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'hv',
      }
      return newProperties

    case SUBTYPES.SIMPLE_VERTICAL_LINE_SCATTER_MIDPOINT_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'vhv',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_VERTICAL_LINE_SCATTER_MIDPOINT_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'vhv',
      }
      return newProperties

    case SUBTYPES.SIMPLE_HORIZONTAL_LINE_SCATTER_MIDPOINT_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'hvh',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_HORIZONTAL_LINE_SCATTER_MIDPOINT_STEP_PLOT:
      newProperties.line = {
        ...newProperties.line,
        shape:'hvh',
      }
      return newProperties

    default:
      return { ...getProperties()}
  }
};
