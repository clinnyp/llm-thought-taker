export const apiBaseUrl = `${process.env.API_ENDPOINT}`

export const headers = {
  "Authorization": `Bearer ${process.env.AUTH_TOKEN}`,
  'Content-Type': 'application/json',
}