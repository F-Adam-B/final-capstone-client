import * as types from '../actions/actionType';

const initialState = {
  // (1) landing-page, (2) features
  selectedView: 'landing-page',
};

const viewReducer = (state = initialState, action) => {
  switch (action.type){
    case types.TOGGLE_VIEW:
      return Object.assign({}, state, {
        selectedView: action.selectedView
      });
  }
  return state;
};

export default viewReducer;
