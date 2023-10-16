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

    return new Promise<ApiResponse<string[]>>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const fileContents = await Promise.all(
            files.map((file) => {
              return readFile(file);
            })
          );
          resolve({
            status: "success",
            message: "Files uploaded successfully",
            data: fileContents,
          });
        } catch (error) {
          reject(new Error("Failed to read files"));
        }
      }, 500); // 0.5 seconds delay simulation
    });
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
    deleteLatestFile: (state) => {
      state.data.pop();
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.status = "pending";
        console.log("ASDASD");
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

export const {
  setTemplate,
  setTemplateStatus,
  setTemplateError,
  deleteLatestFile,
} = templateSlice.actions;
export default templateSlice.reducer;
