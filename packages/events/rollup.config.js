import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
import postcssFlexboxfixer from 'postcss-flexboxfixer';
import { terser } from 'rollup-plugin-terser';

import pkg from '../../package.json';

let externals = [];
if (pkg.peerDependencies) {
  externals = Object.keys(pkg.peerDependencies);
}

export default {
  input: './src/index.ts',
  output: [
    // {
    //   format: 'cjs',
    //   file: 'dist/index.js',
    // },
    // {
    //   format: 'es',
    //   file: 'dist/index.esm.js',
    // },
    // {
    //   format: 'cjs',
    //   file: 'dist/index.min.js',
    //   plugins: [terser()],
    // },
    // {
    //   format: 'es',
    //   file: 'dist/index.esm.min.js',
    //   plugins: [terser()],
    // },
    {
      format: 'es',
      file: 'dist/index.esm.js',
      plugins: [terser()],
    },
  ],
  external: [...externals],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
    }),
    postcss({
      extract: false,
      modules: false,
      plugins: [autoprefixer, postcssFlexboxfixer],
    }),
  ],
};
