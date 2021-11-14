import actionType from './actionType';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SHOW_LOADING:
      return {
        ...state,
        loadingStatus: true
      };
    case actionType.HIDE_LOADING:
      return {
        ...state,
        loadingStatus: false
      };

    default:
      return state;
  }
};

export default reducer;
