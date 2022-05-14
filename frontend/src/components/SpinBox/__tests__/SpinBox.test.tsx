import React from 'react';
import renderer from 'react-test-renderer';
import SpinBox from '../SpinBox';

describe('Dropdown', () => {
  const className = 'testClassName';

  it('snapshot matches with className props', () => {
    const tree = renderer
      .create(<SpinBox min={0} max={10} defaultValue={5} className={className} />)
      .toTree();
    expect(tree).toMatchSnapshot();
  });
});
