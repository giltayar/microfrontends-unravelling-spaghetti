import fs from 'fs'
import path from 'path'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import {babel} from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'

export default {
  input: 'src/todo-list-page',
  output: {format: 'esm', dir: 'dist', sourcemap: true},
  plugins: [
    babel(JSON.parse(await fs.promises.readFile(path.resolve('.babelrc.dist.json'), 'utf8'))),
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    }),
    terser({output: {comments: false}}),
  ],
}
