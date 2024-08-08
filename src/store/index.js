import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/root.reducer";

const persistConfig = {
  key: "historySearchData",
  whitelist: ["history"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default reduxStore;
