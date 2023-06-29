import * as types from "./actionTypes";

export const isOpenAdvisor = (message) => {
  return (dispatch) => {
    dispatch(isOpenAdvisorMessage(message));
  };
};

const isOpenAdvisorMessage = (message) => ({
  type: types.ISOPENADVISOR,
  message,
});

export const setScreenState = (payload) => {
  return (dispatch) => {
    dispatch(setScreenStatePayload(payload));
  };
};

const setScreenStatePayload = (payload) => ({
  type: types.SETSCREENSTATE,
  payload,
});
