
import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getLinePlotProperties = (subGraphType:string) => {
  let newProperties;
  newProperties = {
    ...getProperties(),
    type:'scatter',
    mode : 'lines',
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
  console.log(subGraphType, "subgraph type")

  switch (subGraphType) {

    case SUBTYPES.SIMPLE_STRAIGHT:
      return newProperties;

    case SUBTYPES.MULTIPLE_STRAIGHT:
      return newProperties;

    case SUBTYPES.SIMPLE_SPLINE:
      newProperties.line = {
        ...newProperties.line,
        shape: 'spline',
      }
      return newProperties;

    case SUBTYPES.MULTIPLE_SPLINE:
      newProperties.line = {
        ...newProperties.line,
        shape: 'spline',
      }
      return newProperties;

    case SUBTYPES.SIMPLE_VERTICAL_STEP:
      newProperties.line = {
        ...newProperties.line,
        shape:'vh',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_VERTICAL_STEP:
      newProperties.line = {
        ...newProperties.line,
        shape:'vh',
      }
      return newProperties

    case SUBTYPES.SIMPLE_HORIZONTAL_STEP:
      newProperties.line = {
        ...newProperties.line,
        shape:'hv',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_HORIZONTAL_STEP:
      newProperties.line = {
        ...newProperties.line,
        shape:'hv',
      }
      return newProperties

    case SUBTYPES.SIMPLE_VERTICAL_MIDPOINT:
      newProperties.line = {
        ...newProperties.line,
        shape:'vhv',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_VERTICAL_MIDPOINT:
      newProperties.line = {
        ...newProperties.line,
        shape:'vhv',
      }
      return newProperties

    case SUBTYPES.SIMPLE_HORIZONTAL_MIDPOINT:
      newProperties.line = {
        ...newProperties.line,
        shape:'hvh',
      }
      return newProperties

    case SUBTYPES.MULTIPLE_HORIZONTAL_MIDPOINT:
      newProperties.line = {
        ...newProperties.line,
        shape:'hvh',
      }
      return newProperties

    default:
      return { ...getProperties()}
  }
};
