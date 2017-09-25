const ACCESS_TOKEN = 'access-token'

export const getToken =()=> localStorage.getItem(ACCESS_TOKEN)

export const setToken =({token})=>{
  if(!token) return
  localStorage.setItem(ACCESS_TOKEN, token)
}

export const invalidateToken =({status})=>{
  if(status !== 401) return
  localStorage.removeItem(ACCESS_TOKEN)
}

export const removeToken =()=>{
  localStorage.removeItem(ACCESS_TOKEN)
}


