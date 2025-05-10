import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react';

interface User {
  id: string;
  name: string;
}

interface Note {
  id: string;
  userId: string;
  user?: User;
  title: string;
  prompt: string;
  content: string;
  createdAt: Date;
}

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
      return { ...state, prompt: "", response: "" }
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