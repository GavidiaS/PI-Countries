import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country, CountriesState, CountryDetail, DataFulfilledCountries, PayloadCountryActivity } from '../templates';
import axios from "axios";

export const getCountries = createAsyncThunk<Country[], void>("country/getCountries", async () => {
  const response = await axios.get<Country[]>("/countries");
  const data = response.data;
  return data;
});

export const getCountryById = createAsyncThunk<CountryDetail, string, { rejectValue: SerializedError }>("country/getCountryById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get<CountryDetail>(`/countries/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

export const getCountriesByName = createAsyncThunk<DataFulfilledCountries, string, { rejectValue: SerializedError }>("country/getCountriesByName", async (name: string, { rejectWithValue }) => {
  try {
    const response = await axios.get<DataFulfilledCountries>(`/countries?name=${name}`);
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 404) {
        return rejectWithValue({ message: "Country not found" });
      }
    }
    return rejectWithValue({ message: "Unknown error occurred" });
  }
});

const initialState: CountriesState = {
  page: 1,
  country: null,
  countries: [],
  countriesOrigin: [],
  message: "",
  loading: false,
  error: null
}

const countrySlice = createSlice({
  name: "country",
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
    resetCountry: (state) => {
      state.country = null;
      state.error = null;
    },
    resetCountries: (state) => {
      state.countries = [...state.countriesOrigin];
    },
    filterActivity: (state, action: PayloadAction<PayloadCountryActivity>) => {
      const activity = action.payload.activities.find(act => act.id === action.payload.activity);
      if (activity) {
        state.countries = activity.Countries;
      }
    },
    filterContinent: (state, action: PayloadAction<string>) => {
      if (state.countries.length === 0) {
        state.countries = state.countriesOrigin.filter(cn => cn.continent === action.payload);
      } else {
        state.countries = state.countries.filter(cn => cn.continent === action.payload);
      }
    },
    orderName: (state, action: PayloadAction<string>) => {
      state.countries = state.countries.sort((a, b) => {
        if (action.payload === "A-Z") return a.name?.localeCompare(b.name);
        if (action.payload === "Z-A") return b.name?.localeCompare(a.name);
        return 0;
      });
    },
    orderPopulation: (state, action: PayloadAction<string>) => {
      state.countries = state.countries.sort((a, b) => {
        if (action.payload === "ASC") return a.population - b.population;
        if (action.payload === "DES") return b.population - a.population;
        return 0;
      });
    },
    orderArea: (state, action: PayloadAction<string>) => {
      state.countries = state.countries.sort((a, b) => {
        if (action.payload === "ASC") return a.area - b.area;
        if (action.payload === "DES") return b.area - a.area;
        return 0;
      });
    },
    resetMessage: (state) => {
      state.message = "";
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.countriesOrigin = action.payload;
      state.loading = false;
    }).addCase(getCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
    builder.addCase(getCountryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(getCountryById.fulfilled, (state, action) => {
      state.country = action.payload;
      state.loading = false;
    }).addCase(getCountryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Unknown error occurred";
    });
    builder.addCase(getCountriesByName.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(getCountriesByName.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.countries = action.payload;
      } else {
        state.message = action.payload.message;
      }
      state.loading = false;
    }).addCase(getCountriesByName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Unknown error occurred";
    });
  }
});

export const { resetPage, handlePage, increment, decrement, resetCountry, resetCountries, filterActivity, filterContinent, orderName, orderArea, orderPopulation, resetMessage, resetError } = countrySlice.actions;
export default countrySlice.reducer;
