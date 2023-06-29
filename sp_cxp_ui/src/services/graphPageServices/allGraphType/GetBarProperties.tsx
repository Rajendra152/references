
import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getBarProperties = (subGraphType:string) => {
  let newProperties;
  newProperties = {
    ...getProperties(),
    type: 'bar',
    width: 0.5,
    barWidth:0.5,
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
          end: 7,
          gap: 2,
          missingvalues: false,
          outofrange: false,
      },
  },
  }

  newProperties.marker = {
    ...newProperties.marker,
    color: 'gray',
    // pattern:{
    //   shape: '/',
    //   fillmode: 'overlay',
    //   bgcolor:'green',
    //   fgcolor:'red',
    //   fgopacity: 0.5,
    //   size:8,
    //   solidity:0.3,
    // },
  }
  switch (subGraphType) {
    case SUBTYPES.SIMPLE_BAR:
      return newProperties;

    case SUBTYPES.GROUPED_BAR:
      return newProperties;

    case SUBTYPES.STACK_BAR:
       return newProperties;

    case SUBTYPES.SIMPLE_HORIZONTAL_BAR:
      newProperties = { ...newProperties, orientation:'h'}
      return newProperties;

    case SUBTYPES.GROUPED_HORIZONTAL_BAR:  
      newProperties = { ...newProperties, orientation:'h'}
      return newProperties;

    case SUBTYPES.STACKED_HORIZONTAL_BAR:
      newProperties = { ...newProperties, orientation:'h'}
      return newProperties;
      // export const VERTICAL_BAR_ERROR_BAR = "vertical_bar_error_bar";
      // export const GROUPED_VERTICAL_ERROR_BAR = "grouped_vertical_error_bar";
      // export const HORIZONTAL_BAR_ERROR_BAR = "horizontal_bar_error_bar";
      // export const GROUPED_HORIZONTAL_ERROR_BAR = "grouped_horizontal_error_bar";
    case SUBTYPES.VERTICAL_BAR_ERROR_BAR:
      return newProperties;
    case SUBTYPES.GROUPED_VERTICAL_ERROR_BAR:
      return newProperties;
    case SUBTYPES.HORIZONTAL_BAR_ERROR_BAR:
      newProperties = { ...newProperties, orientation:'h'}
      return newProperties;
    case SUBTYPES.GROUPED_HORIZONTAL_ERROR_BAR:
      newProperties = { ...newProperties, orientation:'h'}
      return newProperties;
    default:
      return { ...getProperties()}
  }
};
