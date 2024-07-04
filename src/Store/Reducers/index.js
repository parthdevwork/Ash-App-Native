import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import GeneralReducer from './GeneralReducer';
import TeamReducer from './TeamReducer';
import NotificationReducer from './NotificationReducer';
import HomeReducer from './HomeReducer';

const AppReducers = combineReducers({
  AuthReducer,
  GeneralReducer,
  TeamReducer,
  NotificationReducer,
  HomeReducer,
});

const Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return AppReducers(undefined, action);
  }
  return AppReducers(state, action);
};

export default Reducer;
