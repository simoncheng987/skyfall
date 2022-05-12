import React from 'react';
import renderer from 'react-test-renderer';
import AvatarFrame from '../AvatarFrame';

describe('Avatar frame', () => {
  const className = 'testClassName';

  it('matches snapshot with no prop', () => {
    const tree = renderer.create(<AvatarFrame />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer.create(<AvatarFrame className={className} />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer.create(<AvatarFrame imgSrc="host.png" />).toTree();
    expect(tree).toMatchSnapshot();
  });
});
