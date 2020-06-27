export const getAuthHead = {
  headers: {
    'Content-type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}