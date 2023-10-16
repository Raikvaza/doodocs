// slices/fieldsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface FieldsState {
  data: string;
  error: string | null;
}

const initialState: FieldsState = {
  data: "",
  error: null,
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    setFields: (state, action) => {
      //TODO need to check for the validity of the incoming data
      action.payload && (state.data = JSON.parse(action.payload));
      !action.payload && (state.data = "");
      state.error = null;
    },
    setFieldsError: (state, action) => {
      state.error = action.payload;
      state.data = "";
    },
  },
});

export const { setFields, setFieldsError } = fieldsSlice.actions;
export default fieldsSlice.reducer;
