

import{LEGENDS, LEGENDS_ITEMS, GRIDS, GRAPH_PLANES, FRAME_LINES, ROTATION, GRID_FILLS, GEOGRAPHIC} from "../../components/Constant/GraphDialog";

import { getLegendsJSON, getGridJSON, getGraphPlanesJSON,
  getFrameLinesJSON, getRotationJSON, getGrid_FillsJSON,getGeographicJSON } from "./graphSubListJSON/getGrapInsetsJSON";


export const getGraphObject = (layout:any, properties:any) =>{
  const grphObj = {
    [LEGENDS] : getLegendsJSON(layout, properties),
    [LEGENDS_ITEMS] : getLegendsJSON(layout, properties),
  }

  
  if(properties.type === 'scatter3d' || properties.type === 'mesh3d' || properties.type === 'bar3d'){
        grphObj[GRIDS]= getGridJSON(layout, properties);
        grphObj[GRAPH_PLANES]=getGraphPlanesJSON(layout, properties);
        // grphObj[FRAME_LINES]=getFrameLinesJSON(layout, properties);
        // grphObj[ROTATION]=getRotationJSON(layout, properties);

  }
  else if(properties.type !== 'pie'){
    grphObj[GRIDS]= getGridJSON(layout, properties);
    grphObj[GRAPH_PLANES]= getGraphPlanesJSON(layout, properties);
  }

  if(layout.graphType === "radarPlot"){
    console.log("hiiiiiiiiiiii",layout.graphType)
    grphObj[GRAPH_PLANES]=getGraphPlanesJSON(layout, properties);
    grphObj[GRID_FILLS] = getGrid_FillsJSON(layout, properties)
  }
  else if(layout.graphType === "polarPlot"){
    grphObj[GRAPH_PLANES]=getGraphPlanesJSON(layout, properties);
  }
  else if(properties.type === "choropleth"){
    grphObj[GEOGRAPHIC]=getGeographicJSON(layout, properties);
  }
  return grphObj

}
