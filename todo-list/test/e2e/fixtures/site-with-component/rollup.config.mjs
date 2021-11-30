import fs from 'fs'
import path from 'path'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import browsersync from 'rollup-plugin-browsersync'
import {rollupPluginHTML as html} from '@web/rollup-plugin-html'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import {babel} from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

export default {
  input: process.env.ROLLUP_SITE_HTML,
  output: {format: 'esm', sourcemap: true},
  plugins: [
    babel(
      JSON.parse(await fs.promises.readFile(path.resolve(__dirname, '.babelrc.test.json'), 'utf8'))
    ),
    typescript({
      declarationDir: process.env.ROLLUP_OUTPUT_DIR,
      outDir: process.env.ROLLUP_OUTPUT_DIR,
    }),
    nodeResolve(),
    commonjs(),
    injectProcessEnv({NODE_ENV: process.env.NODE_ENV}),
    html(),
  ],
}
