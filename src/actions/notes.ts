'use server'


export async function getLLMResponse(prompt: { prompt: string }) {
  try {
    const response = await fetch("http://localhost:5004/generateChat", {
      method: "POST", headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImNsaW50b25waGlsYXRob25nIiwic3ViIjoiY2xpbnRvbnBoaWxhdGhvbmciLCJqdGkiOiIyNGNmNmNlZSIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0Ojk5NTMiLCJodHRwczovL2xvY2FsaG9zdDo0NDM3MSIsImh0dHA6Ly9sb2NhbGhvc3Q6NTAwNCIsImh0dHBzOi8vbG9jYWxob3N0OjcyMjAiXSwibmJmIjoxNzQ1MTI2Njk4LCJleHAiOjE3NTI5ODkwOTgsImlhdCI6MTc0NTEyNjY5OSwiaXNzIjoiZG90bmV0LXVzZXItand0cyJ9.bYWQh11IVJLLHZNbO1Jghk7LcFUNtLP3ChgeWv8wBsY`,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(prompt)
    })

    if (!response.ok) {
      console.error("Failed to get chat response", response.statusText)
      return { sucess: false }
    }

    const data = await response.json()
    console.log(data)
    return {
      data,
      success: true,
    }
  } catch (error) {
    console.error(error)
  }

}