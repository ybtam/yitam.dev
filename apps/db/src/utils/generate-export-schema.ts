import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'

function generateExports({
  dirPath,
  pattern,
  output,
}: {
  dirPath: string
  pattern: string
  output: string
}): void {
  const exports: string[] = []
  const schemaFiles = glob.sync(pattern, { cwd: dirPath })

  schemaFiles.forEach(filePath => {
    // Construct the full path to the schema file.
    const fullFilePath = path.posix.join('./', filePath)
    // Important: Use backticks for template literals and ${} for variable interpolation.
    exports.push(`export * from './${fullFilePath}';`)
  })

  const indexContent: string = exports.join('\n')

  try {
    fs.writeFileSync(output, indexContent)
  } catch (err) {
    console.error(`Error writing to file ${output}:`, err)
  }
}

generateExports({
  dirPath: './src/schemas',
  pattern: '**/*/schema.ts',
  output: './src/schemas/index.ts',
})

generateExports({
  dirPath: './src/schemas',
  pattern: '**/*/zod.ts',
  output: './src/schemas/zod.ts',
})
