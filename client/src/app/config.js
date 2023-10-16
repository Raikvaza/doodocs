import templateReducer from "../features/templates/templateSlice";
import fieldsReducer from "../features/fields/fieldsSlice";
import { combineReducers } from "redux";
import session from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
const persistConfig = {
  key: "auth",
  storage: session,
};

const combinedReducer = combineReducers({
  fields: fieldsReducer,
  templates: templateReducer,
});

export const persistedAuthReducer = persistReducer(
  persistConfig,
  combinedReducer
);
