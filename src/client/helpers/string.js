import humps from 'humps'

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function toSnakeCase(string){
  string = string.split(' ').map(s => capitalizeFirstLetter(s)).join('')
  return humps.decamelize(string)
}