import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userService } from "@/lib/api-service"
import { authService } from "@/lib/api-service" // Import authService
import type { RootState } from "../store"

interface User {
  _id: string
  email: string
  fullName: string
  role: number
  createdAt: string
  updatedAt: string
}

interface UsersState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getAll()
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка получения пользователей")
  }
})

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id: string, { rejectWithValue }) => {
  try {
    const response = await userService.getById(id)
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка получения пользователя")
  }
})

export const createUser = createAsyncThunk("users/createUser", async (userData: any, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData)
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка создания пользователя")
  }
})

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }: { id: string; userData: any }, { rejectWithValue }) => {
    try {
      const response = await userService.update(id, userData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка обновления пользователя")
    }
  },
)

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string, { rejectWithValue }) => {
  try {
    await userService.delete(id)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Ошибка удаления пользователя")
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex((user) => user._id === action.payload._id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
        state.selectedUser = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter((user) => user._id !== action.payload)
        if (state.selectedUser && state.selectedUser._id === action.payload) {
          state.selectedUser = null
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSelectedUser } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.users
export const selectSelectedUser = (state: RootState) => state.users.selectedUser
export const selectUsersLoading = (state: RootState) => state.users.loading
export const selectUsersError = (state: RootState) => state.users.error

export default usersSlice.reducer
