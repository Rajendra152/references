import * as types from './actionTypes'

const initialState = {
  isOpenResultGraph: false,
  testOptionDisable: false
}

const resultGraphReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ISOPENRESULTGRAPH:
      state.isOpenResultGraph = action.message.message;
      return {
        ...state
      }
      case types.TEST_OPTION_DISABLE:
        state.testOptionDisable = action.message.message;
        return {
          ...state
        }
        default:
          return state
  }
}
export default resultGraphReducer
