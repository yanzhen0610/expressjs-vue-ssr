function getResponseStatus(res) {
  if (res.error !== undefined && res.error.code) {
    return 'failed';
  }

  return res.statusCode >= 400 ? 'failed' : 'ok';
}

function getResponseObject(res, data) {
  const object = { status: getResponseStatus(res) };
  if (data !== undefined) {
    object.data = data;
  }
  if (res.error) {
    object.error = res.error;
  }
  return object;
}

function getDefaultCodeAndMessage(statusCode) {
  if (statusCode < 400) {
    return { code: 'unknown', message: 'Unknown' };
  } else if (statusCode == 404) {
    return { code: 'not_found', message: 'Not Found' };
  } else if (statusCode < 500) {
    return { code: 'bad_request', message: 'Bad Request' };
  }
  return { code: 'server_error', message: 'Server Error' };
}

module.exports = function api(req, res, next) {
  res.isSent = false;
  res.isApi = true;

  const resSend = res.send.bind(res);
  const resEnd = res.end.bind(res);
  res.send = data => {
    res.isSent = true;
    return resSend(JSON.stringify(getResponseObject(res, data)));
  };
  res.end = (...args) => {
    // always with error
    res.statusCode >= 400 && (res.error || res.setError());
    res.isSent || res.send();
    return resEnd(...args);
  };

  res.setOk = () => {
    delete res.error;
    return res;
  };
  res.setError = (code, message, extra) => {
    // default code & message
    const defaults = getDefaultCodeAndMessage(res.statusCode);
    const error = { code: code || defaults.code, message: message || defaults.message };

    // extra info
    if (extra) {
      if (typeof extra == 'object') {
        Object.assign(error, extra);
      } else {
        error.extra = extra;
      }
    }

    res.error = error;
    return res;
  };

  return next();
}

