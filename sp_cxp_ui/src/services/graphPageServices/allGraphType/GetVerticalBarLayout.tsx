
import * as TYPES from "./GraphTypeConstants";
import { getLayout,get2dAxisLayout } from "../DefaultGraphProperties";


export const GetVerticalBarLayout = (subGraphType:string) => {
  switch (subGraphType) {

    case TYPES.GROUPED_BAR:
      return { ...getLayout(), ...get2dAxisLayout(), barmode: 'group'};

    case TYPES.STACK_BAR:
      return { ...getLayout(), ...get2dAxisLayout(), barmode: 'stack'};

    case TYPES.GROUPED_HORIZONTAL_BAR:
      return { ...getLayout(),...get2dAxisLayout(), barmode: 'group'};

    case TYPES.STACKED_HORIZONTAL_BAR:
      return { ...getLayout(),...get2dAxisLayout(), barmode: 'stack'};

    default:
      return { ...getLayout(),...get2dAxisLayout(),}
  }
};
