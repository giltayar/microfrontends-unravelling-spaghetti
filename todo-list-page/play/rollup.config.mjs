import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import browsersync from 'rollup-plugin-browsersync'
import {rollupPluginHTML as html} from '@web/rollup-plugin-html'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import {babel} from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import fs from 'fs'
import path from 'path'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

export default {
  input: 'play/index.html',
  output: {format: 'esm', dir: 'dist', sourcemap: true},
  plugins: [
    babel({
      // We ignore "d3-array.js" because babel throws a syntax error.
      // reference: https://github.com/FormidableLabs/victory-native/issues/653
      ignore: ['./node_modules/d3-array/dist/d3-array.js'],
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
      plugins: [
        [
          '@babel/plugin-transform-typescript',
          {
            isTSX: true,
          },
        ],
        [
          '@emotion/babel-plugin',
          {
            importMap: {
              '@roundforest/emotion-styled': {
                styled: {
                  canonicalImport: ['@emotion/styled', 'default'],
                },
              },
            },
          },
        ],
      ],
    }),
    typescript({declarationDir: 'dist', outDir: 'dist'}),
    nodeResolve(),
    commonjs(),
    injectProcessEnv({NODE_ENV: process.env.NODE_ENV}),
    browsersync({server: 'dist', watch: true, notify: false}),
    html(),
  ],
}
