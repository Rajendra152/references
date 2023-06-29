
import * as SUBTYPES from './GraphTypeConstants'
import { getProperties } from "../DefaultGraphProperties";

export const getVerticalBarProperties = (subGraphType:string) => {
  let newProperties;
  newProperties = { 
    ...getProperties(),
    type: 'bar',
    width: 0.5,
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

    default:
      return { ...getProperties()}
  }
};
