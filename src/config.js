const baseURl = 'https://apex-dent-backend-nodejs.herokuapp.com/';
const configUrl = {
  admin: {
    REGISTER: `${baseURl}api/register-user`,
    LOGIN: `${baseURl}api/signin`,
    GET_ALL_BOOKINGS: `${baseURl}api/booking/admin/getAll/bookings`,
    CHANGE_STATUS: `${baseURl}api/booking/update`,
    GET_TIME_SLOTS: `${baseURl}api/booking`,
    ADMIN_BOOKING: `${baseURl}api/booking/admin/patient`,
    GET_SETTINGS: `${baseURl}api/settings`,
    UPDATE_SETTINGS: `${baseURl}api/settings/update`,
    GET_GRAPH_DATA: `${baseURl}api/booking/dashboard`
  }
};

export default configUrl;
