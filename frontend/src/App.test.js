import React from 'react';
import { render } from '@testing-library/react';
import Main from './Views/Login';

test('renders learn react link', () => {
console.log('test')
  const { getByText } = render(<Main />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
