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
      state.data = JSON.parse(action.payload);
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
