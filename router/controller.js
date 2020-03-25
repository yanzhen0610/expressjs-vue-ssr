const controllerPath = '../controllers/'

function controller(name) {
  return require(controllerPath + name);
}

module.exports = controller;
