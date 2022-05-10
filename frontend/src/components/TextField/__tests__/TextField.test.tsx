import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import TextField from '../TextField';

describe('TextField', () => {
  const placeHolderText = 'Your Name';

  // util method that set up and renders the `TextField` component
  const setup = () => {
    const utils = render(<TextField placeholder={placeHolderText} ariaLabel="name-input" />);
    const input = screen.getByRole('textbox', {
      name: /name-input/i,
    });
    return {
      input,
      ...utils,
    };
  };

  it('renders the placeholder text prop', () => {
    render(<TextField placeholder={placeHolderText} />);
    expect(screen.getByPlaceholderText(placeHolderText)).toBeInTheDocument();
  });

  it('reads the user input value in the textfield', () => {
    const { input } = setup();
    user.type(input, 'Simon');
    expect(input).toHaveValue('Simon');
  });
});
