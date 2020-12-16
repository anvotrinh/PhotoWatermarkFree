import moment from 'moment'

export const MIN_BIRTHDAY = moment().add(-150, 'years').toDate()
export const MAX_BIRTHDAY = new Date()

export const formatDate = date => {
  return moment(date).format('YYYY/MM/DD')
}

export const formatDateTime = date => {
  return moment(date).format('YYYY/MM/DD hh:mm A')
}

export const convertToDate = str => {
  return str ? new Date(str) : new Date()
}
