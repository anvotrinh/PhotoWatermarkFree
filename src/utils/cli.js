const cliColorCode = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
}

const cliColor = (() => {
  const res = {}
  for (const color in cliColorCode) {
    res[color] = (...strs) =>
      `\x1b[${cliColorCode[color]}m${strs.join(' ')}\x1b[0m`
  }
  return res
})()

const logPayload = ({ type, method, url, data, error }) => {
  // eslint-disable-next-line no-console
  console.log(cliColor.red(type), cliColor.blue(method, url))
  if (data) {
    // eslint-disable-next-line no-console
    console.log(cliColor.yellow('Data: '), data)
  }
  if (error) {
    // eslint-disable-next-line no-console
    console.log(cliColor.magenta('Error: '), error)
  }
}

export const logRequest = param => {
  logPayload({ type: 'Request', ...param })
}

export const logResponse = param => {
  logPayload({ type: 'Response', ...param })
}
