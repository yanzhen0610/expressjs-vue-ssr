const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const config = require('../config');
const vueServerRenderer = require('vue-server-renderer');

const bundlePath = path.resolve(__dirname, '..', 'dist', 'vue-ssr-server-bundle.json');
const manifestPath = path.resolve(__dirname, '..', 'dist', 'manifest.json');

const createRenderer = async bundle => vueServerRenderer.createBundleRenderer(bundle, {
  runInNewContext: 'once',
  template: await fsPromises.readFile(path.resolve(__dirname, '..', 'index.html'), 'utf-8'),
});

// might be updated later if it's in development mode
let bundle = require('../dist/vue-ssr-server-bundle.json');
let manifest = require('../dist/manifest.json');

// renderer might be changed if in development mode
let renderer = null;

// calling async function
(async () => renderer = await createRenderer(bundle))();

// Watch for changes
if (process.env.NODE_ENV == 'development') {
  fs.watchFile(bundlePath, async () => {
    bundle = JSON.parse(await fsPromises.readFile(bundlePath, { encoding: 'utf8' }));
    renderer = await createRenderer(bundle);
    console.info('Renderer updated');
  });

  fs.watchFile(manifestPath, async () => {
    manifest = JSON.parse(await fsPromises.readFile(manifestPath, { encoding: 'utf8' }));
    console.info('Manifest updated');
  });
}

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
    // 5xx Server Error
    if (error.code === undefined || error.code >= 500) {
      console.error(error);
      try {
        context.url = context.path = '/500';
        return res.status(500).send(await renderer.renderToString(context));
      } catch {
        return res.status(500).end();
      }
    }

    // 3xx Redirection
    if (error.code >= 300 && error.code < 400) {
      return res.redirect(error.code, error.location);
    }

    if (error.code == 404) {
      // show 404 page
      try {
        context.url = context.path = '/404';
        return res.send(await renderer.renderToString(context));
      } catch {
        return res.status(404).end();
      }
    }

    return res.status(error.code).end();
  }
}

module.exports = spa;
