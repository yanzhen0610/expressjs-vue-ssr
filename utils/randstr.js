const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const availableCharsLength = availableChars.length;

function randstr(length) {
  const result = new Array(length);
  for (let i = 0; i < length; ++i) {
    result[i] = availableChars.charAt(Math.trunc(Math.random() * availableCharsLength));
  }
  return result.join('');
}

module.exports = randstr;
