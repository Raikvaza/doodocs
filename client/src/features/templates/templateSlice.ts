// slices/templateSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "../../types/api";
import { PayloadAction } from "@reduxjs/toolkit";
interface TemplateState {
  data: string[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | undefined;
}

const initialState: TemplateState = {
  data: [],
  status: "idle",
  error: undefined,
};

export const uploadFiles = createAsyncThunk<ApiResponse<string[]>, File[]>(
  "template/uploadFiles",
  async (files) => {
    const readFile = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            resolve(event.target.result as string);
          } else {
            reject(new Error("Event target is null"));
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsText(file);
      });
    };

    try {
      const fileContents = await Promise.all(
        files.map((file) => {
          return readFile(file);
        })
      );
      return {
        status: "success",
        message: "Files uploaded successfully",
        data: fileContents,
      };
    } catch (error) {
      throw new Error("Failed to read files");
    }
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
      .addCase(uploadFiles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        uploadFiles.fulfilled,
        (state, action: PayloadAction<ApiResponse<string[]>>) => {
          state.status = "succeeded";
          state.data = action.payload.data;
          state.error = undefined;
        }
      )
      .addCase(uploadFiles.rejected, (state, action) => {
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
