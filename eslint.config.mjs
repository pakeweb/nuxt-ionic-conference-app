import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    // unocss: true,
    vue: true,
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },
  withNuxt,
)
