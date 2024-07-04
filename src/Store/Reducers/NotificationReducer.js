import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  Notification: [],
  NotificationObject: null,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATIONS:
      let getNoti = [];
      getNoti = [...state.Notification, ...action.payload.docs];
      state = {
        ...state,
        NotificationObject: action.payload,
        Notification: getNoti,
      };
      break;

    case ActionTypes.RESET_NOTIFICATION:
      state = {...state, Notification: [], NotificationObject: null};
      break;

    default:
      break;
  }
  return state;
};

export default NotificationReducer;
