/**
 * Lodash method to create snake case
 * @param {string} string
 */
export default (string) => (
  words(`${string}`.replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? '_' : '') + word.toLowerCase()
  ), '')
)
