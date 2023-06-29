
import{DATA, SYMBOLS, LINES, AREA_FILLS, FILLS, PIE_SLICES, BAR_WIDTHS, _3D_LINES, REFERENCE_LINES, DROP_LINES, 
  BOX_OPTIONS, MESH, CONTOUR_FILLS, CONTOUR_SCALE, CONTOUR_LABELS, CONTOUR_DETAILS} from "../../components/Constant/GraphDialog";
import{ GRAPH, AXIS, PLOT} from "../../components/Constant/GraphDialog";
import{SCALING, RADAR_LABELS_TICKS, MAJOR_LABELS, MAJOR_POLAR_LABELS, MAJOR_TERNARY_LABELS,
  MINOR_LABELS, MINOR_POLAR_LABELS, MINOR_TERNARY_LABELS, MAJOR_TICK_LABELS, MINOR_TICK_LABELS,
  MAJOR_TICKS, MAJOR_TERNARY_TICKS, AXIS_FILLS, BREAKS,
  } from "../../components/Constant/GraphDialog";

export interface DialogListJSON  {
  [GRAPH]?: Object,
  [AXIS]?: Object,
  [PLOT]?: PlotDialogList,

}

export interface AxisDialogList{
  [LINES]?: Object,
  [SCALING]?: Object,

  [RADAR_LABELS_TICKS]?: Object,
  [MAJOR_LABELS]?: Object,
  [MAJOR_POLAR_LABELS]?: Object,
  [MAJOR_TERNARY_LABELS]?: Object,

  [MINOR_LABELS]?: Object,
  [MINOR_POLAR_LABELS]?: Object,
  [MINOR_TERNARY_LABELS]?: Object,

  [MAJOR_TICK_LABELS]?: Object,
  [MINOR_TICK_LABELS]?: Object,

  [MAJOR_TICKS]?: Object,
  [MAJOR_TERNARY_TICKS]?: Object,
  [AXIS_FILLS]?: Object,
  [BREAKS]?: Object
}

export interface PlotDialogList  {
  [DATA]: Object,
  [SYMBOLS]?: Object,
  [LINES]?: Object,
  [AREA_FILLS] ?: Object,
  [FILLS] ?: Object,
  [PIE_SLICES] ?: Object,
  [BAR_WIDTHS] ?: Object,
  [_3D_LINES] ?: Object,
  [REFERENCE_LINES] ?: Object,
  [DROP_LINES] ?: Object,
  [BOX_OPTIONS]?: Object,
  [MESH]?: Object,
  [CONTOUR_FILLS]?: Object,
  [CONTOUR_SCALE]?: Object,
  [CONTOUR_LABELS]?: Object,
  [CONTOUR_DETAILS]?: Object,

}
