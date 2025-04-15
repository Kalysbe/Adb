import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { declarationService } from "@/lib/api-service"
import type { RootState } from "../store"

interface Declaration {
  _id: string
  title: string
  content: any
  createdAt: string
  updatedAt: string
}

interface DeclarationsState {
  declarations: Declaration[]
  selectedDeclaration: Declaration | null
  loading: boolean
  error: string | null
}

const initialState: DeclarationsState = {
  declarations: [],
  selectedDeclaration: null,
  loading: false,
  error: null,
}

export const fetchDeclarations = createAsyncThunk("declarations/fetchDeclarations", async (_, { rejectWithValue }) => {
  try {
    const response = await declarationService.getAll()
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка получения деклараций")
  }
})

export const fetchDeclarationById = createAsyncThunk(
  "declarations/fetchDeclarationById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await declarationService.getById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка получения декларации")
    }
  },
)

export const createDeclaration = createAsyncThunk(
  "declarations/createDeclaration",
  async (declarationData: any, { rejectWithValue }) => {
    try {
      const response = await declarationService.create(declarationData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка создания декларации")
    }
  },
)

export const updateDeclaration = createAsyncThunk(
  "declarations/updateDeclaration",
  async ({ id, declarationData }: { id: string; declarationData: any }, { rejectWithValue }) => {
    try {
      const response = await declarationService.update(id, declarationData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка обновления декларации")
    }
  },
)

export const deleteDeclaration = createAsyncThunk(
  "declarations/deleteDeclaration",
  async (id: string, { rejectWithValue }) => {
    try {
      await declarationService.delete(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка удаления декларации")
    }
  },
)

const declarationsSlice = createSlice({
  name: "declarations",
  initialState,
  reducers: {
    clearSelectedDeclaration: (state) => {
      state.selectedDeclaration = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeclarations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDeclarations.fulfilled, (state, action) => {
        state.loading = false
        state.declarations = action.payload
      })
      .addCase(fetchDeclarations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchDeclarationById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDeclarationById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedDeclaration = action.payload
      })
      .addCase(fetchDeclarationById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createDeclaration.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createDeclaration.fulfilled, (state, action) => {
        state.loading = false
        state.declarations.push(action.payload)
      })
      .addCase(createDeclaration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateDeclaration.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateDeclaration.fulfilled, (state, action) => {
        state.loading = false
        const index = state.declarations.findIndex((declaration) => declaration._id === action.payload._id)
        if (index !== -1) {
          state.declarations[index] = action.payload
        }
        state.selectedDeclaration = action.payload
      })
      .addCase(updateDeclaration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteDeclaration.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteDeclaration.fulfilled, (state, action) => {
        state.loading = false
        state.declarations = state.declarations.filter((declaration) => declaration._id !== action.payload)
        if (state.selectedDeclaration && state.selectedDeclaration._id === action.payload) {
          state.selectedDeclaration = null
        }
      })
      .addCase(deleteDeclaration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelectedDeclaration } = declarationsSlice.actions

export const selectDeclarations = (state: RootState) => state.declarations.declarations
export const selectSelectedDeclaration = (state: RootState) => state.declarations.selectedDeclaration
export const selectDeclarationsLoading = (state: RootState) => state.declarations.loading
export const selectDeclarationsError = (state: RootState) => state.declarations.error

export default declarationsSlice.reducer
