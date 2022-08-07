const path = require('path');
const babel = require('@rollup/plugin-babel');
const packageJson = require('../package.json');
const { version, author } = packageJson;
const pkgName = packageJson.name.includes('/') ? packageJson.name.split('/')[1] : packageJson.name;

// 编译、打包入口文件
const buildEntry = 'src/index.js';
const banner =
  '/*!\n' +
  ` * ${pkgName} v${version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const resolve = p => path.resolve(__dirname, '../', p);

const builds = {
  // Runtime+compiler ES modules build (for direct import in browser)
  'esm-prod': {
    entry: resolve(buildEntry),
    dest: resolve(`dist/${pkgName}.esm.min.js`),
    format: 'es',
    env: 'production',
    plugins: [],
    external: [],
    banner
  },
  // runtime-only production build (Browser)
  'umd-prod': {
    entry: resolve(buildEntry),
    dest: resolve(`dist/${pkgName}.umd.min.js`),
    format: 'umd',
    env: 'production',
    moduleName: 'urlEncodeBase64',
    plugins: [],
    external: [],
    banner
  },
  'cjs-prod': {
    entry: resolve(buildEntry),
    dest: resolve(`dist/${pkgName}.cjs.min.js`),
    format: 'cjs',
    external: [],
    banner
  }
};

function genConfig (name) {
  const opts = builds[name];
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  };

  if (opts.transpile !== false) {
    // config.plugins.push(babel({
    //   exclude: ['node_modules/**']
    // }))
    config.plugins.push(babel.babel({ babelHelpers: "bundled" }));
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  });

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig;
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
