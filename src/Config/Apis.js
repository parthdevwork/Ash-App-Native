export const base_url = 'https://api-staging.asharahapp.com/api/';

export const Apis = {
  sendOtp: `${base_url}send-otp`,
  verifyOtp: `${base_url}verify-otp`,
  resendOtp: `${base_url}resend-otp`,
  Profile: `${base_url}auth/profile`,
  UpdateProfile: `${base_url}auth/update-profile`,
  logout: `${base_url}auth/logout`,
  positions: `${base_url}auth/positions`,

  //Teams
  getTeams: (page, limit, search) =>
    `${base_url}auth/teams/?page=${page}&limit=${limit}&searchTxt=${search}`,
  createTeam: `${base_url}auth/teams/`,
  updateTeam: id => `${base_url}auth/teams/${id}`,
  teamDetail: id => `${base_url}auth/teams/${id}`,
  teamManagement: `${base_url}auth/teams/management/team`,
  acceptRejectTeam: id => `${base_url}auth/teams/request/${id}`,
  RejectTeam: (id, team, player) =>
    `${base_url}auth/teams/request/${id}?team=${team}&player=${player}`,
  requestToJoin: `${base_url}auth/teams/request/join`,
  teamPlayers: id => `${base_url}auth/teams/management/team/${id}`,
  getPlayers: (page, limit, search) =>
    `${base_url}auth/teams/browse/players?page=${page}&limit=${limit}&searchTxt=${search}`,

  //Notification
  getTypes: `${base_url}auth/notifications/types`,
  getNotifications: (page, limit, search) =>
    `${base_url}auth/notifications/?page=${page}&limit=${limit}&type=${search}`,

  //Dashboard
  Home: `${base_url}guest/home`,
  getTournament: (page, limit, search) =>
    `${base_url}auth/tournaments/?page=${page}&limit=${limit}&status=${search}`,
  getTournamentTypes: `${base_url}auth/tournaments/get/status/list`,
  getVideos: (page, limit, search) =>
    `${base_url}auth/tournaments/get/videos/?page=${page}&limit=${limit}&type=${search}`,
  getVideoTypes: `${base_url}auth/tournaments/videos/types`,
  getTournamentDetail: id => `${base_url}auth/tournaments/${id}`,
  requestTournament: `${base_url}auth/tournaments/request/join`,
  WithdrawrequestTournament: (id, team, tour) =>
    `${base_url}auth/tournaments/request/${id}?team=${team}&tournament=${tour}`,
  selectedPlayer: `${base_url}auth/tournaments/set-players`,

  //Match
  getMatchDetails: id => `${base_url}auth/match/${id}`,
  matchSupport: `${base_url}auth/match/support`,
  lineup: `${base_url}auth/match/set-line-up`,

  //LeaderBoard
  getLeadTeam: (page, limit) =>
    `${base_url}auth/leader-board/teams/?page=${page}&limit=${limit}`,
  getLeadPlatyer: (page, limit) =>
    `${base_url}auth/leader-board/players/?page=${page}&limit=${limit}`,
};
