import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders app', () => {
  render(<App />);
  expect(screen).toBeDefined()
  expect(screen.getByText('Home')).toBeDefined();
  expect(screen.getAllByText('Movies')).toHaveLength(2);
  expect(screen.getAllByText('Loading...')).toHaveLength(7);
});