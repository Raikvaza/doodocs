// slices/templateSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../types/api";
import { PayloadAction } from "@reduxjs/toolkit";
interface TemplateState {
  data: File[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | undefined;
}

const initialState: TemplateState = {
  data: [],
  status: "idle",
  error: undefined,
};

export const uploadFile = createAsyncThunk<ApiResponse<File>, File>(
  "template/uploadFile",
  async (file) => {
    const response = await new Promise<ApiResponse<File>>((resolve, reject) => {
      setTimeout(() => {
        if (file) {
          resolve({
            status: "success",
            message: "File uploaded successfully",
            data: file,
          });
        } else {
          reject(new Error("Failed to upload file"));
        }
      }, 3000); // Api simulation
    });
    return response;
  }
);

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      state.data = [action.payload];
    },
    setTemplateStatus: (state, action) => {
      state.status = action.payload;
    },
    setTemplateError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        uploadFile.fulfilled,
        (state, action: PayloadAction<ApiResponse<File>>) => {
          state.status = "succeeded";
          state.data = [action.payload.data];
          state.error = undefined;
        }
      )
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "rejected";
        if (action.error) {
          state.error = action.error.message;
        }
        state.data = [];
      });
  },
});

export const { setTemplate, setTemplateStatus, setTemplateError } =
  templateSlice.actions;
export default templateSlice.reducer;
