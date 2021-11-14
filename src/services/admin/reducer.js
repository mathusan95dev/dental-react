import actionType from './actionType';
import initialState from './initialState';

const reducer = (state = initialState, action) => {
  console.log(action.info, 'action.info');
  switch (action.type) {
    case actionType.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        adminLoginStatus: true
      };
    case actionType.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        adminLoginStatus: false
      };

    case actionType.ADMIN_LOGIN_NULL:
      return {
        ...state,
        adminLoginStatus: null
      };

    case actionType.GET_ALL_BOOKING_SUCCESS:
      return {
        ...state,
        bookingStatus: true,
        bookingList: action.payload
      };
    case actionType.GET_ALL_BOOKING_FAILURE:
      return {
        ...state,
        bookingStatus: false,
        bookingList: []
      };

    case actionType.GET_ALL_TIMESSLOTS_SUCCESS:
      return {
        ...state,
        slotStatus: true,
        slotList: action.payload
      };
    case actionType.GET_ALL_TIMESSLOTS_FAILURE:
      return {
        ...state,
        slotStatus: false,
        slotList: []
      };

    case actionType.BOOKING_SUCCESS:
      return {
        ...state,
        adminBookingStatus: true
      };

    case actionType.BOOKING_FAILURE:
      return {
        ...state,
        adminBookingStatus: false
      };

    case actionType.BOOKING_NULL:
      return {
        ...state,
        adminBookingStatus: 'nullable'
      };

    case actionType.GET_SETTING_SUCCESS:
      return {
        ...state,
        settingList: action.payload
      };

    case actionType.GET_SETTING_FAILURE:
      return {
        ...state,
        settingList: []
      };

    case actionType.GET_GRAPH_DATA_FAILURE:
      return {
        ...state,
        graphData: []
      };

    case actionType.GET_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        graphData: action.payload
      };

    case actionType.GET_ALL_BOOKING_TODAY_SUCCESS:
      return {
        ...state,
        todayBooking: action.payload
      };

    case actionType.GET_ALL_BOOKING_TODAY_FAILURE:
      return {
        ...state,
        todayBooking: []
      };

    case actionType.ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        registerStatus: true
      };

    case actionType.ADMIN_REGISTER_FAILURE:
      return {
        ...state,
        registerStatus: false
      };

    case actionType.ADMIN_REGISTER_NULL:
      return {
        ...state,
        registerStatus: 'nullable'
      };

    default:
      return state;
  }
};

export default reducer;
