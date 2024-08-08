import { combineReducers } from 'redux';
import weatherReducer from '~/store/slices/weather.slice';
import historyReducer from '~/store/slices/history.slice';
const rootReducer = combineReducers({
  weather: weatherReducer,
  history: historyReducer,
});

export default rootReducer;
