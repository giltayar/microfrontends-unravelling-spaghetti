import path from 'path'
// eslint-disable-next-line node/no-missing-import
import {Generator, clearCache} from '@jspm/generator'
import {readFile, writeFile} from 'fs/promises'

clearCache()

const args = process.argv.slice(2)

if (args.length !== 3) {
  console.log(
    'usage: node generate-play.js <play-dir> <root-js-file-path-in-target-dir> <html-page>',
  )
  process.exit(1)
}

const playDir = args[0]
const jsFile = args[1]
const htmlFilename = args[2]

const importMap = await generateImportMap()

const htmlFile = path.join(playDir, htmlFilename)
const htmlFileCode = await readFile(htmlFile, 'utf8')
const transformedHtmlCode = htmlFileCode.replace(
  /<script type="importmap">.*?<\/script>/s,
  `<script type="importmap">${JSON.stringify(importMap)}</script>`,
)
await writeFile(htmlFile, transformedHtmlCode, 'utf8')

async function generateImportMap() {
  const generator = new Generator({
    mapUrl: new URL(path.join(playDir, 'index.html'), import.meta.url),
    defaultProvider: 'jspm',
    providers: {
      '@roundforest': 'nodemodules',
    },
    resolutions: {
      react: '17',
      'react-dom': '17',
    },
    env: ['browser', 'development'],
  })

  await generator.traceInstall(path.resolve(playDir, jsFile))

  return generator.importMap.flatten().toJSON()
}
