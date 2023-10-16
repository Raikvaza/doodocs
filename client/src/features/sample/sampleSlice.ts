import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConvertAPI from "convertapi-js";
const convertApi = ConvertAPI.auth("YOUR_API_SECRET");

interface SampleState {
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

const initialState: SampleState = {
  status: "idle",
  error: null,
};

export const convertFileAsync = createAsyncThunk<string, File>(
  "sample/convertFile",
  async (file: File) => {
    const params = convertApi.createParams();
    params.add("file", file);
    const result = await convertApi.convert("html", "docx", params);
    const url = result.files[0].Url;
    return url;
  }
);

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(convertFileAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(convertFileAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(convertFileAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default sampleSlice.reducer;
