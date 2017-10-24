import moment from 'moment'

export function download(type, data, name = 'response'){

  let payload = null

  if(type === 'csv') payload = toCSV(data)
  if(type === 'json') payload = toJSON(data)

  // create anchor and synthesize a click
  const element = document.createElement('a')
  element.setAttribute('href', payload)
  element.setAttribute('download', `${moment().format('YYYY_MM_DD')}_${name}.${type}`)
  element.click()
}

const toCSV =(data)=>{
  return 'data:text/csv;charset=utf-8,' + encodeURIComponent(data)
}

const toJSON =(data)=>{
  return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2))
}
