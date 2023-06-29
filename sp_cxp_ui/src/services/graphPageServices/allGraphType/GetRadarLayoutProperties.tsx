
import * as TYPES from "./GraphTypeConstants";
import { getLayout,getRadarAxisLayout } from "../DefaultGraphProperties";

export const GetRadarLayoutProperties = (subGraphType:string) => {
    let newLayout = {
      ...getLayout(),
      ...getRadarAxisLayout()
    }
  switch (subGraphType) {
    
    case TYPES.RADAR_LINE:
      return newLayout;

    case TYPES.RADAR_LINE_SCATTER:
      return newLayout;
    
    case TYPES.RADAR_SCATTER:
    return newLayout;

    default:
      return { ...newLayout}
  }
};
