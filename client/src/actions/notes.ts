'use server'

import { currentUser } from "@clerk/nextjs/server"
import { apiBaseUrl } from "@/lib/utils"
import { getHeaders } from "./utils"

export async function getLLMResponse(prompt: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/generate_chat`, {
      method: "POST", headers: await getHeaders(), body: JSON.stringify({ prompt: prompt })
    })

    if (!response.ok) {
      console.error("Failed to get chat response", response.statusText)
      return { sucess: false }
    }

    const data = await response.json()
    return {
      ...data,
      success: true,
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

}

export async function createNote(title: string, prompt: string, content: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes`, {
      method: "POST", headers: await getHeaders(), body: JSON.stringify({
        title,
        prompt,
        content,
      })
    })
    if (!response.ok) {
      console.error("Failed to save LLM response", response.statusText)
      return { success: false }
    }
    const data = await response.json()
    return {
      ...data,
      success: true
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function getNoteById(noteId: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes/${noteId}`, { method: "GET", headers: await getHeaders() })
    if (!response.ok) {
      console.error("Failed to get note", response.statusText)
      return { success: false }
    }
    const data = await response.json()
    return {
      ...data,
      success: true
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteNote(noteId: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/notes/${noteId}`, { method: "DELETE", headers: await getHeaders() })
    if (!response.ok) {
      console.error("Failed to delete note", response.statusText)
      return { success: false }
    }
    const data = await response.json()
    return {
      ...data,
      success: true
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function getAllUserNotes() {
  try {
    const response = await fetch(`${apiBaseUrl}/notes/user`, { headers: await getHeaders() })

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

