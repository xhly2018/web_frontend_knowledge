
export function DateDiff(timestamp) {
  let minute = 1000 * 60
  let hour = minute * 60
  let now = new Date().getTime()
  let diffValue = now - timestamp

  let hourC = diffValue / hour
  let minC = diffValue / minute

  if (hourC >= 1) {
    return parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC) + '分钟前'
  }
  return '刚刚'
}
