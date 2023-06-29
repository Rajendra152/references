import * as types from './actionTypes';

const initialState = {
  isOpenFormatCell: false,
  isOpenPlotEquation: false,
  isOpenPlotRegression: false,
  isOptionsUpdated: false,
  isOpenMultipleComparisons: false,
  isOpenMultipleControl: false,
  isOpenMultipleControlL2: false,
  isOpenMultipleControlL3: false,
  isOutput: []
};

const formatCellReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ISOPENFORMATCELL:
      state.isOpenFormatCell = action.message.message;
      return { ...state };
    case types.ISOPENPLOTEQUATION:
      state.isOpenPlotEquation = action.message.message;
      return { ...state };
    case types.ISOPENPLOTREGRESSION:
      state.isOpenPlotRegression = action.message.message;
      return { ...state };
    case types.ISOPTIONSUPDATED:
      state.isOptionsUpdated = action.message.message;
      return { ...state };
    case types.ISOPENMULTIPLECOMPARISONS:
      state.isOpenMultipleComparisons = action.message.message;
      return { ...state };
    case types.ISOPENMULTIPLECONTROL:
      state.isOpenMultipleControl = action.message.message;
      return { ...state };
    case types.ISOPENMULTIPLECONTROLL2:
      state.isOpenMultipleControlL2 = action.message.message;
      return { ...state };
    case types.ISOPENMULTIPLECONTROLL3:
      state.isOpenMultipleControlL3 = action.message.message;
      return { ...state };
    case types.ISOUTPUTFORMATAVAIALBLE:
      state.isOutput = action.message.message;
      return { ...state };
    default:
      return state;
  }
};

export default formatCellReducer;
