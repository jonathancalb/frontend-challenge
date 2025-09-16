module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    // Detect unused variables and imports
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_' 
    }],
    
    // React specific unused rules
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    
    // React refresh for development
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // Turn off prop-types since we're using TypeScript
    'react/prop-types': 'off',
    
    // Allow console for development
    'no-console': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
