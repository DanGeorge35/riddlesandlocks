import type { Preview } from '@storybook/react';
import '../src/tokens.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'vault',
      values: [
        { name: 'vault', value: '#070A14' },
        { name: 'surface', value: '#0E1220' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
