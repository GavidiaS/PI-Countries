import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataFulfilledRegister, DataFulfilledLogin, UserState } from '../templates';
import { LocalStorageLogin, LocalStorageRegister } from "../../interfaces";
import axios from "axios";

export const login = createAsyncThunk<DataFulfilledLogin, LocalStorageLogin, { rejectValue: SerializedError }>("user/login", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.get<DataFulfilledLogin>(`/user?email=${user.email}&password=${user.password}`);
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 404) {
        return rejectWithValue({ message: "That email does not exist" });
      } else if (status === 403) {
        return rejectWithValue({ message: "The password is incorrect" });
      }
    }
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

export const register = createAsyncThunk<DataFulfilledRegister, LocalStorageRegister, { rejectValue: SerializedError }>("user/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post<DataFulfilledRegister>("/user", user);
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        return rejectWithValue({ message: "That email already exists" });
      }
    }
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

const initialState: UserState = {
  access: false,
  user: null,
  message: "",
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.access = false;
      state.user = null;
    },
    resetMessage: (state) => {
      state.message = "";
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(login.fulfilled, (state, action) => {
      state.access = action.payload.access ?? false;
      state.user = action.payload.user ?? null;
      state.message = "Welcome User!";
      state.loading = false;
    }).addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Unknown error occurred";
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(register.fulfilled, (state, action) => {
      state.message = action.payload.successfully ?? "";
      state.loading = false;
    }).addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Unknown error occurred";
    })
  }
});

export const { logout, resetMessage, resetError } = userSlice.actions;
export default userSlice.reducer;