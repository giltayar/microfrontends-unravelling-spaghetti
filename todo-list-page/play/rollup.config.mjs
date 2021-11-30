import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import browsersync from 'rollup-plugin-browsersync'
import {rollupPluginHTML as html} from '@web/rollup-plugin-html'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

export default {
  input: 'play/index.html',
  output: {format: 'esm', dir: 'dist', sourcemap: true},
  plugins: [
    nodeResolve(),
    commonjs(),
    injectProcessEnv({NODE_ENV: process.env.NODE_ENV}),
    browsersync({server: 'dist', watch: true, notify: false}),
    html(),
  ],
}
