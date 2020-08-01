module.exports = function toIso8601String(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  let hour = date.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  let minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  let millisecond = date.getMilliseconds();
  millisecond = millisecond < 10 ? '00' + millisecond : (millisecond < 100 ? '0' + millisecond : millisecond);
  const timezoneOffset = date.getTimezoneOffset();
  const absolute = Math.abs(timezoneOffset);
  let timezoneOffsetHour = Math.trunc(absolute / 60);
  timezoneOffsetHour = timezoneOffsetHour < 10 ? '0' + timezoneOffsetHour : timezoneOffsetHour;
  let timezoneOffsetMinute = Math.trunc(absolute % 60);
  timezoneOffsetMinute = timezoneOffsetMinute < 10 ? '0' + timezoneOffsetMinute : timezoneOffsetMinute;
  const timezone = `${timezoneOffset <= 0 ? '+' : '-'}${timezoneOffsetHour}:${timezoneOffsetMinute}`;
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}${timezone}`;
}
