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
