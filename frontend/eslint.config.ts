import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    name: 'app/rules',
    rules: {
      // `_` で始まる引数は未使用でも許可（ロジックの枠用）
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // any 禁止（CLAUDE.md の規約）
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  skipFormatting,
)
