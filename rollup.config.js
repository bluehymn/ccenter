import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
// import pkg from './package.json';

export default {
  input: `src/index.ts`,
  output: [
    { file: 'lib/index.js', format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['rxjs'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    del({ targets: 'lib/*' }),
    typescript({ abortOnError: false }),
  ],
};
