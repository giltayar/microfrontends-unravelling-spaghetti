// Insert here all `declare module 'some-module'` for modules with types.
// You can also add `export interface {...} <name>` to export Typescript stuff that you can't
// define using JSDoc, but you have to do that in another `.d.ts` file.
declare module 'close-with-grace'
declare module 'react-dom/server.js'

interface Window {
  __DATA__: any
  __NONCE__: any
}
