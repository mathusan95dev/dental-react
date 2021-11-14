import axios from 'axios';
import URL from '../../config';
import actionType from './actionType';
import { ShowLoading, HideLoading } from '../common/action';

export const register = (username, email, password, dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: 'post',
    url: URL.admin.REGISTER,
    data: {
      name: username,
      email,
      password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());

      if (res.status === 201) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.ADMIN_REGISTER_SUCCESS
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      dispatch({
        type: actionType.ADMIN_REGISTER_FAILURE
      });
    });
};

export const registerNull = (dispatch) => {
  dispatch({
    type: actionType.ADMIN_REGISTER_NULL
  });
};

export const AdminLogin = (payload) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: 'post',
    url: URL.admin.LOGIN,
    data: payload,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.ADMIN_LOGIN_SUCCESS
        });
        sessionStorage.setItem('token', res.data.token);
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
    });
};

export const AdminLoginNull = () => (dispatch) => {
  dispatch({
    type: actionType.ADMIN_LOGIN_NULL
  });
};

export const getAllBookings = (token) => (dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'get',
    url: URL.admin.GET_ALL_BOOKINGS,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_ALL_BOOKING_SUCCESS,
          payload: res.data.docs
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_ALL_BOOKING_FAILURE
      });
    });
};

export const changeStatus = (token, id, data) => (dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'put',
    url: ` ${URL.admin.CHANGE_STATUS}/${id}`,
    data,
    headers: {
      Authorization: ` Bearer ${token}`,
      'Content-type': 'application/json'
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch(getAllBookings(token));
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
    });
};

export const getTimeSlots = (date) => (dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'post',
    url: URL.admin.GET_TIME_SLOTS,
    data: {
      date
    },
    headers: {
      'Content-type': 'application/json'
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_ALL_TIMESSLOTS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_ALL_TIMESSLOTS_FAILURE
      });
    });
};

export const bookingsNull = () => (dispatch) => {
  dispatch({
    type: actionType.BOOKING_NULL
  });
};

export const bookings = (token, data) => (dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'post',
    url: URL.admin.ADMIN_BOOKING,
    data,
    headers: {
      'Content-type': 'application/json',
      Authorization: ` Bearer ${token}`
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.BOOKING_SUCCESS
        });

        dispatch(getAllBookings(token));
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.BOOKING_FAILURE
      });
    });
};

export const getSettings = (token) => (dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'get',
    url: URL.admin.GET_SETTINGS,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_SETTING_SUCCESS,
          payload: res.data.Setting
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_SETTING_FAILURE
      });
    });
};

export const editSetting = (token, data) => (dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'put',
    url: URL.admin.UPDATE_SETTINGS,
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        // dispatch({
        //   type: actionType.GET_SETTING_SUCCESS,
        //   payload: res.data.Setting
        // });
        dispatch(getSettings(token));
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      // dispatch({
      //   type: actionType.GET_SETTING_FAILURE
      // });
    });
};

export const fetchGraphData = (token, fromDate, toDate, dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'get',
    url: URL.admin.GET_GRAPH_DATA,
    params: {
      fromDate,
      toDate
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_GRAPH_DATA_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_GRAPH_DATA_FAILURE
      });
    });
};

export const getAllBookingsToday = (token, fromDate, toDate, dispatch) => {
  dispatch(ShowLoading());

  const config = {
    method: 'get',
    url: URL.admin.GET_ALL_BOOKINGS,
    headers: {
      Authorization: ` Bearer ${token}`
    },
    params: {
      fromDate,
      toDate
    }
  };
  axios(config)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_ALL_BOOKING_TODAY_SUCCESS,
          payload: res.data.docs
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_ALL_BOOKING_TODAY_FAILURE
      });
    });
};
