import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  Dashboard: null,
  Tournaments: [],
  TourObjects: null,
  TourDetails: null,
  Videos: [],
  VideosObjects: null,
  MatchDetail: null,
  LeadPlayers: [],
  TopPlayers: [],
  LeadPlayerObject: null,
  LeadTeam: [],
  TopTeam: [],
  LeadTeamObject: null,
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DASHBOARD:
      state = {
        ...state,
        Dashboard: action.payload,
      };
      break;

    case ActionTypes.RESET_DASHBOARD:
      state = {...state, Dashboard: null};
      break;

    case ActionTypes.GET_TOURNAMENTS:
      let gettour = [];
      gettour = [...state.Tournaments, ...action.payload.docs];
      state = {
        ...state,
        TourObjects: action.payload,
        Tournaments: gettour,
      };
      break;

    case ActionTypes.GET_TOUR_DETAIL:
      state = {
        ...state,
        TourDetails: action.payload,
      };
      break;

    case ActionTypes.RESET_TOURNAMENT:
      state = {...state, Tournaments: [], TourObjects: null};
      break;

    case ActionTypes.GET_VIDEOS:
      let getVideos = [];
      getVideos = [...state.Videos, ...action.payload.docs];
      state = {
        ...state,
        VideosObjects: action.payload,
        Videos: getVideos,
      };
      break;

    case ActionTypes.RESET_VIDEOS:
      state = {...state, Videos: [], VideosObjects: null};
      break;

    case ActionTypes.MATCH_DETAILS:
      state = {
        ...state,
        MatchDetail: action.payload,
      };
      break;

    case ActionTypes.LEAD_PLAYER:
      let getPlayer = [];
      getPlayer = [...state.LeadPlayers, ...action.payload.docs];
      if (getPlayer.length > 3 && action.payload.page == 1) {
        let playersList = [...getPlayer];
        let chunk = 3;
        let array = playersList.slice(0, chunk);
        var array2 = playersList.slice(chunk, chunk + playersList.length);
        state = {
          ...state,
          LeadPlayerObject: action.payload,
          TopPlayers: array,
          LeadPlayers: array2,
        };
      } else if (action.payload.page > 1) {
        state = {
          ...state,
          LeadPlayerObject: action.payload,
          TopPlayers: state.TopPlayers,
          LeadPlayers: getPlayer,
        };
      } else {
        state = {
          ...state,
          LeadPlayerObject: action.payload,
          TopPlayers: getPlayer,
          LeadPlayers: [],
        };
      }

      break;

    case ActionTypes.LEAD_TEAM:
      let getTeam = [];
      getTeam = [...state.LeadTeam, ...action.payload.docs];
      if (getTeam.length > 3 && action.payload.page == 1) {
        let TeamList = [...getTeam];
        let chunk = 3;
        let array = TeamList.slice(0, chunk);
        var array2 = TeamList.slice(chunk, chunk + TeamList.length);
        state = {
          ...state,
          LeadTeamObject: action.payload,
          TopTeam: array,
          LeadTeam: array2,
        };
      } else if (action.payload.page > 1) {
        state = {
          ...state,
          LeadTeamObject: action.payload,
          TopTeam: state.TopTeam,
          LeadTeam: getTeam,
        };
      } else {
        state = {
          ...state,
          LeadTeamObject: action.payload,
          TopTeam: getTeam,
          LeadTeam: [],
        };
      }

      break;

    case ActionTypes.RESET_LEADERBOARD:
      state = {
        ...state,
        LeadPlayers: [],
        TopPlayers: [],
        LeadPlayerObject: null,
      };
      break;

    case ActionTypes.RESET_LEADERBOARD_TEAM:
      state = {
        ...state,
        LeadTeam: [],
        TopTeam: [],
        LeadTeamObject: null,
      };
      break;

    default:
      break;
  }
  return state;
};

export default HomeReducer;
