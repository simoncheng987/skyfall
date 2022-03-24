import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ErrorToast from '../ErrorToast';

describe('ErrorToast', () => {
  const className = 'testClassName';
  const errorMessage = 'ErrorToast Message';

  it('renders the error text prop', () => {
    render(<ErrorToast text={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('matches snapshot with no className prop', () => {
    const tree = renderer.create(<ErrorToast text={errorMessage} />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer.create(<ErrorToast className={className} text={errorMessage} />).toTree();
    expect(tree).toMatchSnapshot();
  });
});
