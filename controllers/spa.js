const fs = require('fs');
const path = require('path');
const config = require('../config');
const vueServerRenderer = require('vue-server-renderer');
const bundle = require('../dist/vue-ssr-server-bundle.json');
const manifest = require('../dist/manifest.json');

const renderer = vueServerRenderer.createBundleRenderer(bundle, {
  runInNewContext: 'once',
  template: fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8'),
});

async function spa(req, res) {
  const context = {
    url: req.url,
    path: req.path,
    state: null,
    manifest,
    base_path: config.base_path,
    base_url: config.base_url,
    domain: config.domain,
    public_path: config.public_path,
    headers: req.headers,
    session_id: req.session.sessionId,
  };

  try {
    res.send(await renderer.renderToString(context));
  } catch (error) {
    res.status(error.code < 500 ? error.code : 500);
    if (error.code == 307) {
      return res.redirect(307, error.location);
    }
    if (error.code == 404) {
      // show 404 page
      try {
        context.url = context.path = '/404';
        return res.send(await renderer.renderToString(context));
      } catch {
        res.status(500);
      }
    } else if (error.code === undefined || error.code >= 500) {
      console.error(error);
    }
    return res.end();
  }
}

module.exports = spa;
