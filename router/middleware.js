const middlewarePath = '../middleware/';

function middleware(name) {
  return require(middlewarePath + name);
}

module.exports = middleware;
