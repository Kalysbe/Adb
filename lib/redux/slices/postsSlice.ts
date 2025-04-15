import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { getPosts as getPostsApi, createPost, updatePost, deletePost } from "@/lib/admin-api"

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  image?: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    fullName: string
  } | null
}

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
}

export const getPosts = createAsyncThunk("posts/getPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await getPostsApi()
    return response
  } catch (error) {
    return rejectWithValue("Failed to fetch posts")
  }
})

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: Omit<Post, "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      const response = await createPost(post)
      return response
    } catch (error) {
      return rejectWithValue("Failed to create post")
    }
  },
)

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, post }: { id: string; post: Partial<Post> }, { rejectWithValue }) => {
    try {
      const response = await updatePost(id, post)
      return response
    } catch (error) {
      return rejectWithValue("Failed to update post")
    }
  },
)

export const removePost = createAsyncThunk("posts/removePost", async (id: string, { rejectWithValue }) => {
  try {
    await deletePost(id)
    return id
  } catch (error) {
    return rejectWithValue("Failed to delete post")
  }
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload
        state.loading = false
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload)
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id)
        if (index !== -1) {
          state.posts[index] = action.payload
        }
      })
      .addCase(removePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
  },
})

export const selectPosts = (state: RootState) => state.posts?.posts || []
export const selectPostsLoading = (state: RootState) => state.posts?.loading || false
export const selectPostsError = (state: RootState) => state.posts?.error || null

export default postsSlice.reducer
