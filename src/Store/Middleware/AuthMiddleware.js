import axios from 'axios';
import { Apis } from '../../Config/Apis';
import { headers } from '../../Config/AxiosConfig';
import {
  hideLoading,
  showAlert,
  showLoading,
} from '../../Store/Actions/GeneralActions';
import { login, userData } from '../../Store/Actions/AuthAction';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthMiddleware = {
  SendOtp: ({ phone }) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('phoneNumber', phone);
          let response = await axios.post(
            Apis.sendOtp,
            params,
            headers.headerUrlEncoded,
          );
          if (response) {
            resolve(response.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Login',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
        dispatch(hideLoading());
      });
    };
  },

  VerifyOtp: ({ phone, token, code }) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('phoneNumber', phone);
          params.append('rememberToken', token);
          params.append('code', code);
          let response = await axios.post(
            Apis.verifyOtp,
            params,
            headers.headerUrlEncoded,
          );
          if (response) {
            // let token = response.headers['set-cookie'][0];
            // await AsyncStorage.setItem('@token', token);
            await AsyncStorage.setItem(
              '@userData',
              JSON.stringify(response.data.data),
            );
            dispatch(userData(response.data.data));
            dispatch(login(true));
            resolve(response.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Verify Otp',
              message: error?.response?.data?.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
        dispatch(hideLoading());
      });
    };
  },

  ResendOtp: ({ phone, token }) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('phoneNumber', phone);
          params.append('rememberToken', token);
          let response = await axios.post(
            Apis.resendOtp,
            params,
            headers.headerUrlEncoded,
          );
          if (response) resolve(response.data);
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Verify Otp',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
        dispatch(hideLoading());
      });
    };
  },

  GetUserData: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await axios.get(
            Apis.Profile,
            headers.headerUrlEncoded,
          );
          if (response) {
            dispatch(userData(response.data.data));
            resolve(response.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'User Profile',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  UpdateProfile: data => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let Formdata = new FormData();
          Formdata.append('fullName', data.fullName);
          Formdata.append('nickName', data.nickName);
          Formdata.append('dateOfBirth', data.dateOfBirth);
          Formdata.append('isMale', data.isMale);
          Formdata.append('specialFoot', data.specialFoot);
          Formdata.append('shortPosition', data.shortPosition);
          Formdata.append('position', data.position);
          Formdata.append('height', data.height);
          Formdata.append('weight', data.weight);
          Formdata.append('topSpeed', data.topSpeed);
          if (data.picture) Formdata.append('picture', data.picture);
          let response = await axios.patch(
            Apis.UpdateProfile,
            Formdata,
            headers.headerFormData,
          );
          if (response) {
            await AsyncStorage.setItem(
              '@userData',
              JSON.stringify(response.data.data),
            );
            dispatch(userData(response.data.data));
            resolve(response.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Profile',
              message: error?.response?.data?.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
        dispatch(hideLoading());
      });
    };
  },

  getPositions: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await axios.get(
            Apis.positions,
            headers.headerUrlEncoded,
          );
          if (response) {
            resolve(response.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'User Profile',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  logout: () => {
    return dispatch => {
      // dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let response = await axios.delete(
            Apis.logout,
            headers.headerUrlEncoded,
          );
          if (response) {
            resolve(response.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'User Profile',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
        // dispatch(hideLoading());
      });
    };
  },
};
