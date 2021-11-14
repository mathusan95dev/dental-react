import actionType from './actionType';

export const ShowLoading = () => (dispatch) => {
  dispatch({
    type: actionType.SHOW_LOADING
  });
};

export const HideLoading = () => (dispatch) => {
  dispatch({
    type: actionType.HIDE_LOADING
  });
};
