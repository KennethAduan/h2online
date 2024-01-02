import {
  configureStore,
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

import userSlice from "./slice/userSlice";
import orderSlice from "./slice/orderSlice";
import credentialSlice from "./slice/credentialSlice";
import countdownSlice from "./slice/countdownSlice";
// Encrypt transform configuration
const encryptor = encryptTransform({
  secretKey: "my-super-secret-key", // Use a secure key
  onError: function (error: Error) {
    // Handle the error
    console.error("Encryptor error:", error);
  },
});

// Persist configuration with encryption
const persistConfig: PersistConfig<RootState> = {
  key: "H2_Online",
  version: 1,
  storage,
  transforms: [encryptor],
};

// Combining reducers
const rootReducer = combineReducers({
  user: userSlice,
  order: orderSlice,
  credential: credentialSlice,
  countdown: countdownSlice,
});

// Redux state interface
export interface RootState {
  user: ReturnType<typeof userSlice>;
  order: ReturnType<typeof orderSlice>;
  credential: ReturnType<typeof credentialSlice>;
  countdown: ReturnType<typeof countdownSlice>;
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Action creators and types
export const register = createAction("register");
export type AppDispatch = typeof store.dispatch;
