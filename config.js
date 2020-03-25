require('dotenv').config();

domain = process.env.APP_DOMAIN || 'localhost';
http_port = process.env.APP_PORT || 3000;
base_path = process.env.APP_PATH || '/';
base_url = process.env.APP_URL || `http://${domain}:${http_port}${base_path}`;
public_path = process.env.PUBLIC_PATH || `${base_url}public/`;

module.exports = {
  app_name: process.env.APP_NAME || 'app',
  domain,
  http_port,
  base_path,
  base_url,
  public_path,
  session: {
    id_length: 64,
    maxAge: 24 * 60 * 60 * 1000
  },
};
