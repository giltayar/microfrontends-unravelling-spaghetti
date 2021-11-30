import fs from 'fs'
import path from 'path'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {babel} from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

export default [
  {
    input: 'src/client/todo-list-page-server-client.js',
    output: {format: 'esm', dir: 'dist', sourcemap: true},
    plugins: [
      babel(JSON.parse(await fs.promises.readFile(path.resolve('dev/.babelrc.dist.json'), 'utf8'))),
      nodeResolve(),
      commonjs(),
      replace({'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true}),
      terser({output: {comments: false}}),
      disableTypeScriptCheck(),
    ],
  },
  {
    input: 'src/client/todo-list-page-server-renderer.js',
    output: {format: 'esm', dir: 'dist', sourcemap: true},
    plugins: [
      babel(JSON.parse(await fs.promises.readFile(path.resolve('dev/.babelrc.dist.json'), 'utf8'))),
      nodeResolve({preferBuiltins: false}),
      commonjs(),
      replace({
        delimiters: ['', ''],
        values: {
          // https://github.com/rollup/rollup/issues/1507#issuecomment-340550539
          "require('readable-stream/transform')": "require('stream').Transform",
          'require("readable-stream/transform")': 'require("stream").Transform',
          'readable-stream': 'stream',
          // Keep only production env
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        preventAssignment: true,
      }),
      terser({output: {comments: false}}),
      disableTypeScriptCheck(),
    ],
  },
]

function disableTypeScriptCheck() {
  return {
    renderChunk(code) {
      return '// @ts-nocheck \n' + code
    },
  }
}
