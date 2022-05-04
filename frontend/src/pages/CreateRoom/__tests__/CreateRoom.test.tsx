import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ClientContextProvider from '../../../context/ClientProvider';
import CreateRoom from '../CreateRoom';

describe('CreateRoom', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <ClientContextProvider>
          <MemoryRouter initialEntries={[{ pathname: '/create', key: 'testKey' }]}>
            <CreateRoom />
          </MemoryRouter>
        </ClientContextProvider>,
      )
      .toTree();
    expect(tree).toMatchSnapshot();
  });
});
