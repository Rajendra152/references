
import * as TYPES from "./GraphTypeConstants";
import { getLayout,getPolarAxisLayout } from "../DefaultGraphProperties";

export const GetPolarLayoutProperties = (subGraphType:string) => {
    let newLayout = {
        ...getLayout(),
        ...getPolarAxisLayout()
    }
  switch (subGraphType) {
    
    case TYPES.POLAR_SCATTER:
      return {...newLayout};

    case TYPES.POLAR_LINE:
      return newLayout;
    
    case TYPES.POLAR_LINE_SCATTER:
    return newLayout;

    default:
      return { ...newLayout}
  }
};
