export function queryToObject(string){
  if(!string.trim().length)
    return {}

  const hashes = string.slice(string.indexOf('?') + 1).split('&')
  return hashes.reduce((obj, hash) => {
    hash = hash.split('=')
    if(!hash) return obj
    const key = hash[0]
    const value = +hash[1] || hash[1]
    return {...obj, [key]: value}
  }, {})
}

export function queryToString(obj){
  for(let key in obj)
    if(!obj[key]) delete obj[key]

  return Object.keys(obj).reduce((string, key, index)=>{
    const separator = index === 0 ? '?' : '&'
    return obj[key] ? string + separator + key + '=' + obj[key] : string
  }, '')
}