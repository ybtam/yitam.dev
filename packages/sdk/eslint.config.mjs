import reactConfig from '@repo/config-eslint/react.js'

export default [
  ...reactConfig,
  {
    ignores: ['node_modules', 'build', 'postcss.config.js'],
    rules: {
      ' import/no-anonymous-default-export': 'off',
    },
  },
]
