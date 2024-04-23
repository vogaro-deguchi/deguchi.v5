const stylelintConfigRecessOrder = require('stylelint-config-recess-order')

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order', 'stylelint-scss'],
  customSyntax: "postcss-scss",
  overrides: [
    {
      files: ["**/*.{jsx,tsx,js}"],
      customSyntax: "@stylelint/postcss-css-in-js",
    },
  ],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'blockless-after-same-name-blockless'],
        ignoreAtRules: ['else']
      }
    ],
    "function-no-unknown": null,
    'at-rule-no-unknown': null,
    'color-named': 'never',
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'no-empty-source': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend'
        },
        'declarations',
        'at-rules',
        {
          type: 'at-rule',
          name: 'media'
        },
        {
          type: 'at-rule',
          name: 'include'
        },
        'rules'
      ]
    ],
    'order/properties-order': [
      stylelintConfigRecessOrder.rules['order/properties-order'],
      {
        unspecified: 'bottomAlphabetical'
      }
    ],
    "scss/at-mixin-argumentless-call-parentheses": "always",
    "scss/at-rule-no-unknown": true,
    "scss/declaration-nested-properties": "never",
    "scss/double-slash-comment-whitespace-inside": "always",
    "scss/selector-no-redundant-nesting-selector": true,
    "selector-id-pattern": null,
    "selector-class-pattern": null,
    "keyframes-name-pattern": null,
    "scss/at-mixin-pattern": null,
    "scss/dollar-variable-pattern": null,
    "scss/percent-placeholder-pattern": null,
    "no-invalid-double-slash-comments": null,
    "import-notation": null
  }
}
