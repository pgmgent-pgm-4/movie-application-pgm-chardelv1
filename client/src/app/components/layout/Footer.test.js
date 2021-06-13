import {
  getByText,
  render,
  screen,
  within
} from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  const { container } = render( <Footer /> );
  test('it renders', () => {
    expect(container.firstChild).toHaveClass('footer');
  });
  test('it has a paragraph', () => {
    const paragraph = container.getElementsByTagName('p');
    expect(paragraph).toBeDefined();
  })
  test('it has a div', () => {
    const div = container.getElementsByTagName('div');
    expect(div).toBeDefined();
  });
  test('it has a link', () => {
    const link = container.getElementsByTagName('a');
    expect(link).toBeDefined();
  });
});