import ActionTypes from './ActionTypes';

const login = payload => {
  return {
    type: ActionTypes.isLogin,
    payload,
  };
};
const Logout = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};
const userData = payload => {
  return {
    type: ActionTypes.USER_DATA,
    payload,
  };
};

export {login, userData, Logout};
