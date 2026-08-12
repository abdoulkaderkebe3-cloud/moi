import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `dist` seul n'ignorait que le build racine : le lint parcourait aussi les
  // bundles de la copie morte mon-porfolio/, d'où des centaines d'erreurs.
  globalIgnores(['**/dist/**', 'mon-porfolio/**']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Sans cette règle, un identifiant utilisé uniquement en JSX
      // (`<motion.div>`, `<Icon />`) n'est pas vu comme une référence et
      // no-unused-vars le signale à tort.
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Pattern provider + hook dans un même fichier : volontaire ici, ça ne
    // coûte qu'un rechargement complet au lieu d'un fast refresh.
    files: ['src/context/**/*.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
