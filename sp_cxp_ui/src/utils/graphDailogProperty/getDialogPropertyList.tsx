
import { getGraphObject } from './getGraphObject'
import { getAxisObject } from './getAxisObject'
import { getPlotObject } from './getPlotObject'
import { GRAPH, AXIS, PLOT } from "../../components/Constant/GraphDialog";
import { DialogListJSON } from "./graphDialogInterface";

export const getDialogPropertiesList = (layout: Object, properties: Object, axis: string) => {
  const graphDialogPropertyList: DialogListJSON = {}

  graphDialogPropertyList[GRAPH] = getGraphObject(layout, properties)

  if (properties.type !== 'pie' && properties.type !== 'choroplethMap') {
    if (layout.hasOwnProperty("xaxis") || layout.hasOwnProperty("ternary") || layout.hasOwnProperty("scene") || layout.hasOwnProperty("polar")) {
      graphDialogPropertyList[AXIS] = getAxisObject(layout, properties, axis)

    }
  }


  graphDialogPropertyList[PLOT] = getPlotObject(properties, layout);

  return graphDialogPropertyList;

}

