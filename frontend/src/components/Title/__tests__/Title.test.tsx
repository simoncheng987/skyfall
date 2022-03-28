import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from '../Title';

describe('Title', () => {
  const titleText = 'Create Room';
  const colorScheme = 'pink';
  const fontSize = '160px';

  it('renders the title with correct text', () => {
    render(<Title text={titleText} colorScheme={colorScheme} fontSize={fontSize} />);
    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('renders the title with correct font size', () => {
    render(<Title text={titleText} colorScheme={colorScheme} fontSize={fontSize} />);
    const title = screen.getByText(titleText);
    expect(title).toHaveStyle(`font-size: ${fontSize}`);
  });
});
