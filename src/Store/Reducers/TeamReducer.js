import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  Teams: [],
  TeamObject: null,
  SelectedTeam: null,
  ManageTeam: null,
  ManagePlayer: null,
  Players: [],
  PlayersObject: null,
  selectedLineUp:null
};

const TeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TEAMS:
      let getTeams = [];
      getTeams = [...state.Teams, ...action.payload.docs];
      state = {
        ...state,
        TeamObject: action.payload,
        Teams: getTeams,
      };
      break;
    case ActionTypes.UPDATE_TEAM:
      let TeamsCopy = [...state.Teams];
      let index = TeamsCopy.findIndex(item => item.id == action.payload.id);
      TeamsCopy.splice(index, 1, action.payload);
      state = {
        ...state,
        Teams: TeamsCopy,
      };
      break;
    case ActionTypes.SELECTED_TEAMS:
      state = {
        ...state,
        SelectedTeam: action.payload,
      };
      break;
    case ActionTypes.MANAGE_TEAM:
      state = {
        ...state,
        ManageTeam: action.payload,
      };
      break;
    case ActionTypes.MANAGE_TEAM_PLAYER:
      state = {
        ...state,
        ManagePlayer: action.payload,
      };
      break;
    case ActionTypes.REMOVE_TEAM_REQ:
      let teamReq = [...state.ManageTeam?.requests];
      let indexs = teamReq.findIndex(item => item.id == action.payload);
      teamReq.splice(indexs, 1);
      let response = {
        ...state.ManageTeam,
        requests: teamReq,
      };
      state = {
        ...state,
        ManageTeam: response,
      };
      break;
    case ActionTypes.REMOVE_PLAYER_REQ:
      let PlayerReq = [...state.ManageTeam?.requests];
      let PlayerReqIndex = PlayerReq.findIndex(
        item => item.id == action.payload,
      );
      PlayerReq.splice(PlayerReqIndex, 1);
      let responses = {
        ...state.ManagePlayer,
        requests: teamReq,
      };
      state = {
        ...state,
        ManagePlayer: responses,
      };
      break;
    case ActionTypes.RESET_TEAMS:
      state = {
        ...state,
        TeamObject: null,
        Teams: [],
      };
      break;

    case ActionTypes.GET_PLAYERS:
      let getPlayers = [];
      getPlayers = [...state.Players, ...action.payload.docs];
      state = {
        ...state,
        PlayersObject: action.payload,
        Players: getPlayers,
      };
      break;

    case ActionTypes.RESET_PLAYERS:
      state = {
        ...state,
        Players: [],
        PlayersObject: null,
      };
      break;
      case ActionTypes.GET_LINEUP_PLAYERS:
        state = {
          ...state,
          selectedLineUp: action.payload,
        };
        break;
    default:
      break;
  }
  return state;
};

export default TeamReducer;
