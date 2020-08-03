import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/components/App';

test('adds 1 + 2 to equal 3', () => {
  expect(1+ 2).toBe(3);
});

test('renders add project', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Add Project/i);
  expect(linkElement).toBeInTheDocument();
});
