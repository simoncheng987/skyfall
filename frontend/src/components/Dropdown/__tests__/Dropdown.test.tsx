import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  const testOptions = ['option1', 'option2', 'option3'];
  const className = 'testClassName';

  it('renders all options', () => {
    render(<Dropdown options={testOptions} />);
    testOptions.forEach((str) => {
      expect(screen.getByText(str)).toBeInTheDocument();
    });
  });

  it('snapshot matches with className props', () => {
    const tree = renderer.create(<Dropdown options={testOptions} className={className} />).toTree();
    expect(tree).toMatchSnapshot();
  });
});
