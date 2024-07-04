import axios from 'axios';
import {Apis} from '../../Config/Apis';
import {headers} from '../../Config/AxiosConfig';
import {
  hideLoading,
  showAlert,
  showLoading,
} from '../../Store/Actions/GeneralActions';
import {NotificationAction} from '../Actions/NotificationAction';

export const NotificationMiddleware = {
  getNotificationTypes: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.getTypes,
            headers.headerUrlEncoded,
          );
          if (data) {
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Notification',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getNotifications: ({page, search}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1 || search) {
            if (page != 1 && search) {
            } else {
              dispatch(NotificationAction.resetNotifications());
            }
          }
          const {data} = await axios.get(
            Apis.getNotifications(page, 10, search),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(NotificationAction.getNotifications(data.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Teams',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },
};
