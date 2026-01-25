module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
  rules: {
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'color-hex-length': 'long',
    'declaration-block-no-redundant-longhand-properties': true,
    'media-feature-range-notation': 'prefix',
    'no-descending-specificity': null,
    'rule-empty-line-before': null,
    'selector-class-pattern': null,
    'value-keyword-case': ['lower', { ignoreKeywords: ['optimizeLegibility'] }]
  }
};
