import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ClientContextProvider from '../../../context/ClientProvider';
import Lobby from '../Lobby';

describe('Lobby', () => {
  it('snapshot test', () => {
    const tree = renderer
      .create(
        <ClientContextProvider>
          <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
            <Lobby />
          </MemoryRouter>
        </ClientContextProvider>,
      )
      .toTree();
    expect(tree).toMatchSnapshot();
  });
});
