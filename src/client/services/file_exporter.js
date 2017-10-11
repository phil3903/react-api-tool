import jsontoxml from 'jsontoxml'
import json2csv from 'json2csv'
import moment from 'moment'
import humps from 'humps'

export function download(type, data, name = 'response', fields){

  let payload = null

  if(type === 'xml') payload = toXML(data)
  if(type === 'csv') payload = toCSV(data)
  if(type === 'json') payload = toJSON(data)

  // create anchor and synthesize a click
  const element = document.createElement('a')
  element.setAttribute('href', payload)
  element.setAttribute('download', `${moment().format('YYYY_MM_DD')}_${humps.decamelize(name)}.${type}`)
  element.click()
}

const toXML =(data)=>{
  return jsontoxml(data)
}

const toCSV =(data, fields)=>{
  return json2csv({data, fields})
}

const toJSON =(data)=>{
  return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2))
}
