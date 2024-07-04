import ActionTypes from './ActionTypes';

export const HomeAction = {
  getDashboard: payload => {
    return {
      type: ActionTypes.GET_DASHBOARD,
      payload,
    };
  },
  resetdashboard: () => {
    return {
      type: ActionTypes.RESET_DASHBOARD,
    };
  },
  getTour: payload => {
    return {
      type: ActionTypes.GET_TOURNAMENTS,
      payload,
    };
  },
  getTourDetail: payload => {
    return {
      type: ActionTypes.GET_TOUR_DETAIL,
      payload,
    };
  },
  resetTournament: () => {
    return {
      type: ActionTypes.RESET_TOURNAMENT,
    };
  },
  getVideos: payload => {
    return {
      type: ActionTypes.GET_VIDEOS,
      payload,
    };
  },
  resetVideos: () => {
    return {
      type: ActionTypes.RESET_VIDEOS,
    };
  },
  getMatchDetail: payload => {
    return {
      type: ActionTypes.MATCH_DETAILS,
      payload,
    };
  },

  getLeadTeam: payload => {
    return {
      type: ActionTypes.LEAD_TEAM,
      payload,
    };
  },

  getLeadPlayer: payload => {
    return {
      type: ActionTypes.LEAD_PLAYER,
      payload,
    };
  },
  resetLeaderBoard: () => {
    return {
      type: ActionTypes.RESET_LEADERBOARD,
    };
  },
  resetLeaderBoardTeam: () => {
    return {
      type: ActionTypes.RESET_LEADERBOARD_TEAM,
    };
  },
};
