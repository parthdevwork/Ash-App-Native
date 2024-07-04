import axios from 'axios';
import {Apis, base_url} from '../../Config/Apis';
import {headers} from '../../Config/AxiosConfig';
import {
  hideLoading,
  showAlert,
  showLoading,
} from '../../Store/Actions/GeneralActions';
import {TeamAction} from '../Actions/TeamAction';

export const TeamMiddleware = {
  getTeams: ({page, search}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1 || search) {
            if (page != 1 && search) {
            } else {
              dispatch(TeamAction.resetTeams());
            }
          }
          const {data} = await axios.get(
            Apis.getTeams(page, 10, search),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(TeamAction.getTeams(data.data));
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

  createTeam: ({name, bio, city, logo, cover}) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new FormData();
          params.append('teamName', name);
          params.append('teamBio', bio);
          params.append('city', city);
          params.append('logo', logo);
          params.append('cover', cover);

          const {data} = await axios.post(
            Apis.createTeam,
            params,
            headers.headerFormData,
          );
          if (data) {
            resolve(data.data);
            dispatch(
              showAlert({
                title: 'Teams',
                message: 'Team Created Successfully',
                status: 'Success',
              }),
            );
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
        dispatch(hideLoading());
      });
    };
  },

  updateTeam: ({name, bio, city, logo, cover, id}) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new FormData();
          params.append('teamName', name);
          params.append('teamBio', bio);
          params.append('city', city);
          if (logo) params.append('logo', logo);
          if (cover) params.append('cover', cover);

          const {data} = await axios.put(
            Apis.updateTeam(id),
            params,
            headers.headerFormData,
          );
          if (data) {
            dispatch(TeamAction.updateTeam(data.data));
            dispatch(TeamAction.SelectTeam(data.data));
            dispatch(
              showAlert({
                title: 'Teams',
                message: 'Team Updated Successfully',
                status: 'Success',
              }),
            );
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
        dispatch(hideLoading());
      });
    };
  },

  teamDetails: ({id}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        // dispatch(showLoading());
        try {
          const {data} = await axios.get(
            Apis.teamDetail(id),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(hideLoading());
            dispatch(TeamAction.SelectTeam(data.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(hideLoading());
          dispatch(
            showAlert({
              title: 'Teams',
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

  teamManagement: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.teamManagement,
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(TeamAction.TeamManagment(data.data));
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

  declineRequest: ({id, team, player, Screen}) => {
    return dispatch => {
      // dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.delete(
            Apis.RejectTeam(id, team, player),
            headers.headerUrlEncoded,
          );
          if (data) {
            if (Screen == 'TeamM') {
              dispatch(TeamAction.RemoveRequest(id));
            } else {
              dispatch(TeamAction.RemoveRequestPlayer(id));
            }
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
        // dispatch(hideLoading());
      });
    };
  },

  acceptRequest: ({id, team, player, Screen}) => {
    return dispatch => {
      // dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('team', team);
          params.append('player', player);
          const {data} = await axios.patch(
            Apis.acceptRejectTeam(id),
            params,
            headers.headerUrlEncoded,
          );
          if (data) {
            if (Screen == 'TeamM') {
              dispatch(TeamAction.RemoveRequest(id));
            } else {
              dispatch(TeamAction.RemoveRequestPlayer(id));
            }
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
        // dispatch(hideLoading());
      });
    };
  },

  requestToJoin: ({team, player, requestedBy}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('team', team);
          params.append('player', player);
          params.append('requestedBy', requestedBy);
          const {data} = await axios.post(
            Apis.requestToJoin,
            params,
            headers.headerUrlEncoded,
          );
          if (data) {
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
        dispatch(hideLoading());
      });
    };
  },

  teamPlayerManagement: ({id}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.teamPlayers(id),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(TeamAction.TeamPlayerManagment(data.data));
            resolve(data.data);
            dispatch(hideLoading());
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

  getTeamPlayers: ({id, tournament}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            // `${base_url}auth/tournaments/team-players/656f1da52cce61a988c3be0d/656ee7920cca36a53a359f2e`,
            `${base_url}auth/tournaments/team-players/${id}/${tournament}`,
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(TeamAction.TeamPlayerManagment(data.data));
            resolve(data.data);
            dispatch(hideLoading());
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Teams',
              // message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getLineUpPlayers: ({id, tournament}) => {

    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            `${base_url}auth/tournaments/team-players/${id}/${tournament}`,
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(TeamAction.getLineupPlayer(data?.data));
            resolve(data?.data);
            dispatch(hideLoading());
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Teams',
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getPlayers: ({page, search}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1 || search) {
            if (page != 1 && search) {
            } else {
              dispatch(TeamAction.resetPlayers());
            }
          }
          const {data} = await axios.get(
            Apis.getPlayers(page, 10, search),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(TeamAction.getPlayers(data.data));
            resolve(data.data);
            dispatch(hideLoading());
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Players',
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
