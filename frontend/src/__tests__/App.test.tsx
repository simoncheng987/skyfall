import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Default test', () => {
  it('display Skyfall - Frontend', () => {
    render(<App />);
    expect(screen.getByText('Skyfall - Frontend')).toBeInTheDocument();
  });
});
