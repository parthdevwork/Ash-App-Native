import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../BottomTabs/BottomTabs';
import {
  MatchDetails,
  Leaderboard,
  Videos,
  Settings,
  Support,
  About,
  Share,
  Profile,
  Players,
  PlayersManagement,
  Formations,
  Lineups,
  EditProfile,
  VideoScreen,
} from '../../Screens';
import TournamentDetails from '../../Screens/tournament/TournamentDetails';
import AllTeams from '../../Screens/teams/AllTeams';
import TeamManagement from '../../Screens/teams/TeamManagement/TeamManagement';
import MyTeam from '../../Screens/teams/TeamManagement/MyTeam';
import PendingRequests from '../../Screens/teams/TeamManagement/PendingRequest';
import CreateNewTeam from '../../Screens/teams/CreateTeam';
import TeamDetails from '../../Screens/teams/TeamDetails/TeamDetails';
import PlayersList from '../../Screens/playersList/PlayersList';
import SelectedPlayers from '../../Screens/playersList/SelectedPlayers';
import TournamentDetailsStart from '../../Screens/tournament/TournamentDetailsStart';

const AppStack = () => {
  const AppStack = createNativeStackNavigator();
  return (
    <AppStack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{headerShown: false}}>
      <AppStack.Screen name="BottomTabs" component={BottomTabs} />
      <AppStack.Screen name="MatchDetails" component={MatchDetails} />
      <AppStack.Screen name="TournamentDetails" component={TournamentDetails} />
      <AppStack.Screen name="TournamentDetailsStart" component={TournamentDetailsStart} />
      <AppStack.Screen name="Leaderboard" component={Leaderboard} />
      <AppStack.Screen name="Videos" component={Videos} />
      <AppStack.Screen name="VideoScreen" component={VideoScreen} />
      <AppStack.Screen name="Setting" component={Settings} />
      <AppStack.Screen name="Support" component={Support} />
      <AppStack.Screen name="About" component={About} />
      <AppStack.Screen name="Share" component={Share} />
      <AppStack.Screen name="AllTeams" component={AllTeams} />
      <AppStack.Screen name="TeamManagement" component={TeamManagement} />
      <AppStack.Screen name="MyTeam" component={MyTeam} />
      <AppStack.Screen name="PendingRequests" component={PendingRequests} />
      <AppStack.Screen name="CreateNewTeam" component={CreateNewTeam} />
      <AppStack.Screen name="Profile" component={Profile} />
      <AppStack.Screen name="EditProfile" component={EditProfile} />
      <AppStack.Screen name="Players" component={Players} />
      <AppStack.Screen name="PlayersManagement" component={PlayersManagement} />
      <AppStack.Screen name="Formations" component={Formations} />
      <AppStack.Screen name="Lineups" component={Lineups} />
      <AppStack.Screen name="TeamDetails" component={TeamDetails} />
      <AppStack.Screen name="PlayersList" component={PlayersList} />
      <AppStack.Screen name="SelectedPlayers" component={SelectedPlayers} />
    </AppStack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
