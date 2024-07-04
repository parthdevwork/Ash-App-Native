import ActionTypes from './ActionTypes';

export const NotificationAction = {
  getNotifications: payload => {
    return {
      type: ActionTypes.GET_NOTIFICATIONS,
      payload,
    };
  },
  resetNotifications: () => {
    return {
      type: ActionTypes.RESET_NOTIFICATION,
    };
  },
};
