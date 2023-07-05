const moduleOptions = `<%= JSON.stringify(options) %>`
const logStyle =
  'background-color: #FFFAF3; padding: 2px 5px; border-radius: 5px; font-weight: bold; border: 1px solid #131313; color: #131313;'
export function log(...args) {
  const options = JSON.parse(moduleOptions)
  // eslint-disable-next-line no-console
  console.log('%c' + options.nameShort, logStyle, ...args)
}