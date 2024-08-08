import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import weatherReducer from '~/store/slices/weather.slice';
import historyReducer from '~/store/slices/history.slice';

const commonConfig = {
  storage,
};

const historyConfig = {
  ...commonConfig,
  key: "historySearchData",
  whitelist: ["today","keywords"],
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  history: persistReducer(historyConfig, historyReducer),
});

export default rootReducer;
