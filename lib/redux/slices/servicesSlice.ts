import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { getServices as getServicesApi } from "@/lib/admin-api"

export interface Service {
  _id: string
  title: string
  description: string
  icon: string
  slug: string
  price: number
  features: string[]
  isActive: boolean
}

interface ServicesState {
  services: Service[]
  loading: boolean
  error: string | null
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
}

export const fetchServices = createAsyncThunk("services/getServices", async (_, { rejectWithValue }) => {
  try {
    const response = await getServicesApi()
    return response
  } catch (error) {
    return rejectWithValue("Failed to fetch services")
  }
})

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.services = action.payload
        state.loading = false
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const selectServices = (state: RootState) => state.services?.services || []
export const selectServicesLoading = (state: RootState) => state.services?.loading || false
export const selectServicesError = (state: RootState) => state.services?.error || null

export default servicesSlice.reducer
