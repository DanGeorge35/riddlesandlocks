/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve('./eslint.js'), 'next/core-web-vitals', 'next/typescript'],
  rules: {
    // FR-VIS-06: ban internal economic terms in player-facing message files
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'Literal[value=/\\b(pot share|split|reserve|sweep|ledger|treasury|commission rate|referral rate|\\d+%)\\b/i]',
        message: 'FR-VIS-06: internal economic terms are banned from player-facing copy.',
      },
    ],
  },
};
