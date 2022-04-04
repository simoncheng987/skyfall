import React from 'react';
import renderer from 'react-test-renderer';
import CreateRoom from '../CreateRoom';

describe('CreateRoom', () => {
  const className = 'testClassName';

  it('matches snapshot with no className prop', () => {
    const tree = renderer.create(<CreateRoom />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer.create(<CreateRoom className={className} />).toTree();
    expect(tree).toMatchSnapshot();
  });
});
