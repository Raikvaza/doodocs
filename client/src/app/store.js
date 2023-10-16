import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "../features/templates/templateSlice";
import fieldsReducer from "../features/fields/fieldsSlice";
const store = configureStore({
  reducer: {
    templates: templateReducer,
    fields: fieldsReducer,
  },
});

export default store;
