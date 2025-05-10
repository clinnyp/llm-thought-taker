'use server'

import { apiBaseUrl } from "./utils"
import { headers } from "./utils"

export async function getLLMResponse(prompt: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/generateChat`, {
      method: "POST", headers, body: JSON.stringify({ prompt: prompt })
    })

    if (!response.ok) {
      console.error("Failed to get chat response", response.statusText)
      return { sucess: false }
    }

    const data = await response.json()
    return {
      data,
      success: true,
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

}

export async function saveNote(userId: string, title: string, prompt: string, content: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes/create`, {
      method: "POST", headers, body: JSON.stringify({
        userId,
        title,
        prompt,
        content
      })
    })
    if (!response.ok) {
      console.error("Failed to save LLM response", response.statusText)
      return { success: false }
    }
    const data = await response.json()
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function getNoteById(noteId: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes/${noteId}`, { method: "GET", headers })

    if (!response.ok) {
      console.error("Failed to get note", response.statusText)
      return { success: false }
    }
    const data = await response.json()
    return {
      data,
      success: true
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function getAllUserNotes(id: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/users/notes/${id}`)

    if (!response.ok) {
      console.error("Failed to get all users notes", response.statusText)
      return { success: false }
    }

    const data = await response.json()
    return {
      data,
      success: true
    }

  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

