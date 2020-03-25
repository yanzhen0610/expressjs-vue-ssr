const validatorFactory = require('../../../validator/factory');
const rule = require('../../../validator/rule');

const validator = validatorFactory({
  username: [rule('required')],
  password: [rule('required')],
});

module.exports = function login(req, res) {
  const input = validator.validate(req.input).throwOnErrors().validated;

  // temporary login workaround
  if (input.username == 'admin' && input.password == 'admin') {
    const user = { username: 'admin', display_name: 'Administrator' };
    req.session.user = user;
    return res.status(200).send(user);
  }
  return res.setError(
    'incorrect_username_or_password',
    'Incorrect Username or Password.'
  ).status(401).end();
}
