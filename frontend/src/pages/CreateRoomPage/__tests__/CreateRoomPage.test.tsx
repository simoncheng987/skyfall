import React from 'react';
import renderer from 'react-test-renderer';
import CreateRoomPage from '../CreateRoomPage';

describe('CreateRoomPage', () => {
  const className = 'testClassName';

  it('matches snapshot with no className prop', () => {
    const tree = renderer.create(<CreateRoomPage />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer.create(<CreateRoomPage className={className} />).toTree();
    expect(tree).toMatchSnapshot();
  });
});
