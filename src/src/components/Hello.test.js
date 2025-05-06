import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders greeting text', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, plant world!')).toBeInTheDocument();
});
