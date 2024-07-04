import axios from 'axios';
import {Apis} from '../../Config/Apis';
import {headers} from '../../Config/AxiosConfig';
import {
  hideLoading,
  showAlert,
  showLoading,
} from '../../Store/Actions/GeneralActions';
import {HomeAction} from '../Actions/HomeAction';

export const HomeMiddleware = {
  getDashboard: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(HomeAction.resetdashboard());
          const {data} = await axios.get(Apis.Home, headers.headerUrlEncoded);
          if (data) {
            dispatch(HomeAction.getDashboard(data?.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Dashboard',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getTournaments: ({page, search}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1 || search) {
            if (page != 1 && search) {
            } else {
              dispatch(HomeAction.resetTournament());
            }
          }
          const {data} = await axios.get(
            Apis.getTournament(page, 10, search),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getTour(data.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Tournament',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getTounamentTypes: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.getTournamentTypes,
            headers.headerUrlEncoded,
          );
          if (data) {
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Tournament',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getVideos: ({page, search}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1 || search) {
            if (page != 1 && search) {
            } else {
              dispatch(HomeAction.resetVideos());
            }
          }
          const {data} = await axios.get(
            Apis.getVideos(page, 10, search),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getVideos(data.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Videos',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getVideoTypes: () => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.getVideoTypes,
            headers.headerUrlEncoded,
          );
          if (data) {
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Videos',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getTourDetails: ({id}) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.getTournamentDetail(id),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getTourDetail(data?.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Dashboard',
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

  getMatchDetails: ({id}) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.get(
            Apis.getMatchDetails(id),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getMatchDetail(data?.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Dashboard',
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

  getLeadTeams: ({page}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1) {
            dispatch(HomeAction.resetLeaderBoardTeam());
          }

          const {data} = await axios.get(
            Apis.getLeadTeam(page, 10),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getLeadTeam(data.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'LeaderBoard',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  getLeadPlayers: ({page}) => {
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (page == 1) {
            dispatch(HomeAction.resetLeaderBoard());
          }
          const {data} = await axios.get(
            Apis.getLeadPlatyer(page, 10),
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getLeadPlayer(data.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'LeaderBoard',
              message: error.response.data.message,
              status: 'Error',
            }),
          );
          reject(true);
        }
      });
    };
  },

  requestToJoinTournament: ({team, tour}) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('team', team);
          params.append('tournament', tour);
          const {data} = await axios.post(
            Apis.requestTournament,
            params,
            headers.headerUrlEncoded,
          );
          if (data) {
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Tournament',
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

  CancelRequestTournament: ({team, tour, id}) => {
    return dispatch => {
      // dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.delete(
            Apis.WithdrawrequestTournament(id, team, tour),
            headers.headerUrlEncoded,
          );
          if (data) {
            resolve(data);
            // dispatch(hideLoading());
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Tournament',
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

  supportMatch: ({match, type, id, team}) => {
    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new URLSearchParams();
          params.append('match', match);
          params.append('supportType', type);
          params.append('supportTo', id);
          if (team) params.append('team', team);
          const {data} = await axios.post(
            Apis.matchSupport,
            params,
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(HomeAction.getMatchDetail(data?.data));
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'Support',
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

  setLineup: ({match, team, lineUp, layout}) => {

    return dispatch => {
      dispatch(showLoading());
      return new Promise(async (resolve, reject) => {
        try {
          let params = new FormData();
          params.append('match', match);
          params.append('team', team);
          params.append('lineUp', lineUp);

          // for (const [key] of Object.entries(layout)) {
          //   for (const [index, item] of layout[key].entries()) {
          //     params.append(`${key}[${index}]`, item.player?.id);
          //   }
          // }

          const {data} = await axios.post(
            Apis.lineup,
            params,
            headers.headerFormData,
          );
          if (data) {
            dispatch(
              showAlert({
                title: 'LineUp',
                message: 'Lineup Set Successfully.',
                status: 'Success',
              }),
            );
            resolve(data.data);
          }
        } catch (error) {
          dispatch(
            showAlert({
              title: 'LineUp',
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

  SelectPlayers: ({tournament, team, playersData}) => {
    return dispatch => {
      dispatch(showLoading());

      return new Promise(async (resolve, reject) => {
        try {
          const players = playersData.map(item => ({
            shirt: item.shirt,
            id: item.id,
          }));

          const body = {tournament, team, players};

          const {data} = await axios.post(
            Apis.selectedPlayer,
            body,
            headers.headerUrlEncoded,
          );
          if (data) {
            dispatch(hideLoading());
            dispatch(
              showAlert({
                title: 'Players',
                message: 'Players Add Successfully.',
                status: 'Success',
              }),
            );
            resolve(data.data);
          }
        } catch (error) {
          dispatch(hideLoading());
          dispatch(
            showAlert({
              title: 'Players',
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
};
