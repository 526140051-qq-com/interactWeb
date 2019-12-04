import moment from 'moment'

let formatDate = (value, fmt) => {
  if (!value) return ''
  if (fmt) {
    if (fmt === 'Y') return moment(value).format('YYYY')
    if (fmt === 'm') return moment(value).format('YYYY-MM-DD HH:mm')
    if (fmt === 's') return moment(value).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return moment(value).format('YYYY-MM-DD')
  }
}

export {
  formatDate
}
