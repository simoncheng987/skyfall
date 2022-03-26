import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('Button', () => {
  const className = 'testClassName';
  const onClick = () => {};
  const buttonText = 'Button Text';

  it('renders the label text prop', () => {
    render(<Button text={buttonText} />);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('simulate click events', () => {
    const testOnClick = jest.fn();

    render(<Button text={buttonText} onClick={testOnClick} />);
    fireEvent.click(screen.getByText(buttonText));
    expect(testOnClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot with no className prop', () => {
    const tree = renderer.create(<Button text={buttonText} />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer.create(<Button className={className} text={buttonText} />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with onClick prop', () => {
    const tree = renderer.create(<Button onClick={onClick} text={buttonText} />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with buttonStyle prop', () => {
    const tree = renderer.create(<Button buttonStyle="secondary" text={buttonText} />).toTree();
    expect(tree).toMatchSnapshot();
  });
});
