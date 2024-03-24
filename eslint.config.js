// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: true,
  },

  formatters: {
    css: 'prettier',
    prettierOptions: {
      plugins: ['prettier-plugin-tailwindcss'],
    },
  },
  vue: {
    overrides: {
      'vue/max-attributes-per-line': ['error', { singleline: 2 }],
      'vue/attributes-order': ['error', {
        alphabetical: true,
      }],
      'vue/component-tags-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
    },
  },
  javascript: {
    overrides: {
      semi: ['error', 'always'],
    },
  },
  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: {
    tsconfigPath: ['tsconfig.json', 'tsconfig.node.json'],
    overrides: {
      'ts/no-unsafe-assignment': 'off',
      'ts/semi': ['error', 'always'],
      'ts/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'ts/ban-ts-comment': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/restrict-plus-operands': 'off',
      'ts/no-unsafe-argument': 'off',
      'ts/restrict-template-expressions': 'off',
      'ts/no-invalid-this': 'off',
    },
  },
});
