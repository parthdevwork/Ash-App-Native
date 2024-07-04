import ActionTypes from './ActionTypes';

export const TeamAction = {
  getTeams: payload => {
    return {
      type: ActionTypes.GET_TEAMS,
      payload,
    };
  },
  updateTeam: payload => {
    return {
      type: ActionTypes.UPDATE_TEAM,
      payload,
    };
  },
  SelectTeam: payload => {
    return {
      type: ActionTypes.SELECTED_TEAMS,
      payload,
    };
  },
  TeamManagment: payload => {
    return {
      type: ActionTypes.MANAGE_TEAM,
      payload,
    };
  },
  TeamPlayerManagment: payload => {
    return {
      type: ActionTypes.MANAGE_TEAM_PLAYER,
      payload,
    };
  },
  RemoveRequest: payload => {
    return {
      type: ActionTypes.REMOVE_TEAM_REQ,
      payload,
    };
  },
  RemoveRequestPlayer: payload => {
    return {
      type: ActionTypes.REMOVE_PLAYER_REQ,
      payload,
    };
  },
  getPlayers: payload => {
    return {
      type: ActionTypes.GET_PLAYERS,
      payload,
    };
  },

  resetPlayers: () => {
    return {
      type: ActionTypes.RESET_PLAYERS,
    };
  },
  resetTeams: () => {
    return {
      type: ActionTypes.RESET_TEAMS,
    };
  },
  getLineupPlayer: payload => {
    return {
      type: ActionTypes.GET_LINEUP_PLAYERS,
      payload
    };
  },
};
