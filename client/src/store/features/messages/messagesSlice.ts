import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Note } from '@/types';

export interface MessageState {
  prompt: string
  response: string
  loading: boolean
  allNotes: Note[]
}

const initialState: MessageState = {
  prompt: "",
  response: "",
  loading: false,
  allNotes: []
}

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updatePrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload
    },
    updateResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload
    },
    resetMessages: (state) => {
      return { ...state, prompt: "", response: "", allNotes: [] }
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    updateNotes: (state, action: PayloadAction<Note[]>) => {
      // state.allNotes = state.allNotes.push(action.payload)
      state.allNotes.push(...action.payload)
      // state.allNotes = [...state.allNotes, ...action.payload]
    }
  }
})

export const { updatePrompt, updateResponse, resetMessages, updateLoading, updateNotes } = messagesSlice.actions

export default messagesSlice.reducer