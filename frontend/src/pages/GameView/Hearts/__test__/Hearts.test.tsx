import React from 'react';
import renderer from 'react-test-renderer';
import Hearts from '../Hearts';

describe('Hearts', () => {
  const className = 'testClassName';

  it('matches total hearts and remaining hearts', () => {
    const tree = renderer.create(<Hearts totalHearts={5} remainingHearts={3} />).toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer
      .create(<Hearts totalHearts={5} remainingHearts={3} className={className} />)
      .toTree();
    expect(tree).toMatchSnapshot();
  });
});
