export const timeConv = function (str) {
  const d = new Date(str)
  return d
}

export function prettyDate(d) {
  const date = new Date(d)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    months[date.getUTCMonth()] +
    ' ' +
    date.getUTCDate() +
    ', ' +
    date.getUTCFullYear()
  )
}

export function getDifferenceInDays(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60 * 60 * 24))
}

export function getDifferenceInHours(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60 * 60))
}

export function getDifferenceInMinutes(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60))
}

export function getDifferenceInSeconds(date1, date2) {
  const x = new Date()

  const diffInMs = Math.abs(x - date1)
  return parseInt(diffInMs / 1000)
}
