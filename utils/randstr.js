const defaultCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

/**
 * Generate random string.
 *
 * @param {integer} length The length of the random string to be generated.
 * @param {array|string} charSet The characters used to generate the random string.
 * @returns {string}
 */
function randStr(length, charSet = defaultCharSet) {
  const result = new Array(length);
  if (typeof charSet === 'string') {
    for (let i = 0; i < length; ++i) {
      result[i] = charSet.charAt(Math.trunc(Math.random() * charSet.length));
    }
  } else {
    for (let i = 0; i < length; ++i) {
      result[i] = charSet[Math.trunc(Math.random() * charSet.length)];
    }
  }
  return result.join('');
}

module.exports = randStr;
