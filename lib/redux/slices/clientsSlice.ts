import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { clientService } from "@/lib/api-service"
import type { RootState } from "../store"

interface Client {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
}

interface ClientsState {
  clients: Client[]
  selectedClient: Client | null
  loading: boolean
  error: string | null
}

const initialState: ClientsState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
}

export const fetchClients = createAsyncThunk("clients/fetchClients", async (_, { rejectWithValue }) => {
  try {
    const response = await clientService.getAll()
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка получения клиентов")
  }
})

export const fetchClientById = createAsyncThunk("clients/fetchClientById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await clientService.getById(id)
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка получения клиента")
  }
})

export const createClient = createAsyncThunk("clients/createClient", async (clientData: any, { rejectWithValue }) => {
  try {
    const response = await clientService.create(clientData)
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка создания клиента")
  }
})

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, clientData }: { id: string; clientData: any }, { rejectWithValue }) => {
    try {
      const response = await clientService.update(id, clientData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка обновления клиента")
    }
  },
)

export const deleteClient = createAsyncThunk("clients/deleteClient", async (id: string, { rejectWithValue }) => {
  try {
    await clientService.delete(id)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка удаления клиента")
  }
})

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clearSelectedClient: (state) => {
      state.selectedClient = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false
        state.clients = action.payload
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchClientById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedClient = action.payload
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createClient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false
        state.clients.push(action.payload)
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false
        const index = state.clients.findIndex((client) => client._id === action.payload._id)
        if (index !== -1) {
          state.clients[index] = action.payload
        }
        state.selectedClient = action.payload
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false
        state.clients = state.clients.filter((client) => client._id !== action.payload)
        if (state.selectedClient && state.selectedClient._id === action.payload) {
          state.selectedClient = null
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelectedClient } = clientsSlice.actions

export const selectClients = (state: RootState) => state.clients.clients
export const selectSelectedClient = (state: RootState) => state.clients.selectedClient
export const selectClientsLoading = (state: RootState) => state.clients.loading
export const selectClientsError = (state: RootState) => state.clients.error

export default clientsSlice.reducer
