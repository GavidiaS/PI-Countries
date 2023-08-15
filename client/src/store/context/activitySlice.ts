import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActivitiesState, ActivityDetail, ActivityList, ActivityPost, DataFulfilledActivity } from '../templates';
import axios from "axios";

export const getActivities = createAsyncThunk<ActivityList[], void>("activity/getActivities", async () => {
  const response = await axios.get<ActivityList[]>("/activities");
  const data = response.data;
  return data;
});

export const getActivityById = createAsyncThunk<ActivityDetail, number, { rejectValue: SerializedError }>("activity/getActivityById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await axios.get<ActivityDetail>(`/activities/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

export const postActivity = createAsyncThunk<DataFulfilledActivity, ActivityPost, { rejectValue: SerializedError }>("activity/postActivity", async (activity: ActivityPost, { rejectWithValue }) => {
  try {
    const response = await axios.post<DataFulfilledActivity>("/activities", activity);
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        return rejectWithValue({ message: "That activity already exists" });
      }
    }
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

const initialState: ActivitiesState = {
  page: 1,
  activity: null,
  activities: [],
  message: "",
  loading: false,
  error: null
}

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.page = 1;
    },
    handlePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    increment: (state) => {
      state.page += 1;
    },
    decrement: (state) => {
      state.page -= 1;
    },
    resetActivity: (state) => {
      state.activity = null;
    },
    resetMessage: (state) => {
      state.message = "";
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getActivities.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(getActivities.fulfilled, (state, action) => {
      state.activities = action.payload;
      state.loading = false;
    }).addCase(getActivities.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
    builder.addCase(getActivityById.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(getActivityById.fulfilled, (state, action) => {
      state.activity = action.payload;
      state.loading = false;
    }).addCase(getActivityById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Unknown error occurred";
    });
    builder.addCase(postActivity.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(postActivity.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.activities = action.payload;
      } else {
        state.message = action.payload.message;
      }
      state.loading = false;
    }).addCase(postActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Unknown error occurred";
    })
  }
});

export const { resetPage, handlePage, increment, decrement, resetActivity, resetMessage, resetError } = activitySlice.actions;
export default activitySlice.reducer;