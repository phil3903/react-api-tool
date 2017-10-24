import uniq from 'lodash/uniq'

export const getPathsWithoutIndices =(payload)=> {
  let paths = []
  const walk = (obj, path) =>{
    path = path || ""
    for (let key in obj) {
      const value = obj[key]

      if(Array.isArray(value)){
        walk(value, path + '.' + key)
      }
      else if(typeof value === 'object' && !Array.isArray(value)) {
        const append = Array.isArray(obj) ? '' : '.' + key
        walk(value, path + append)
      }
      const append = Array.isArray(obj) ? '' : '.' + key
      paths.push(path + append)
    }
  }

  walk(payload, "")
  return uniq(paths.map(path => path.substring(1)))
}

export const getPathsWithStar =(payload)=> {
  let paths = []
  const walk = (obj, path) =>{
    path = path || ""
    for (let key in obj) {
      const value = obj[key]

      if(Array.isArray(value)){
        walk(value, path + '.' + key)
      }
      else if(typeof value === 'object' && !Array.isArray(value)) {
        const append = Array.isArray(obj) ? '.*' : '.' + key
        walk(value, path + append)
      }
      const append = Array.isArray(obj) ? '.*' : '.' + key
      paths.push(path + append)
    }
  }

  walk(payload, "")
  return uniq(paths
    .map(path => path.substring(1))
    .reduce((arr,path) => path.charAt(path.length - 1) === '*' ? arr :  [...arr, path], {})
  )
}



export const getPaths =(payload)=>{
  let paths = [];
  const walk =(obj,path)=>{
    path = path || ""
    for(let n in obj){
      if (obj.hasOwnProperty(n)) {
        if(typeof obj[n] === "object" || Array.isArray(obj[n])) {
          walk(obj[n],path + "." + n)
        } else {
          paths.push(path + "." + n)
        }
      }
    }
  }
  walk(payload,"")
  return paths.map(path => path.substring(1))
}