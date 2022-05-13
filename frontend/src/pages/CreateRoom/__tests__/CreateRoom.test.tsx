/* eslint-disable testing-library/no-unnecessary-act */

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ClientContext, ClientProviderProps } from '../../../context/ClientProvider';
import CreateRoom from '../CreateRoom';
import { mockLargeWindowSize } from '../../../utils/useWindowSizeMocks';

jest.mock('../../../utils/useWindowSize');

let mockedContext: DeepMockProxy<ClientProviderProps>;
beforeEach(() => {
  mockedContext = mockDeep<ClientProviderProps>();
});

function createComponentWithKey(key: string) {
  return (
    <MemoryRouter initialEntries={[{ pathname: '/join', key }]}>
      <ClientContext.Provider value={mockedContext}>
        <CreateRoom />
      </ClientContext.Provider>
    </MemoryRouter>
  );
}

function renderPage(key: string) {
  mockLargeWindowSize();
  render(createComponentWithKey(key));
}

const EMPTY_INPUT_ERROR = /Please input your name./i;

describe('CreateRoom', () => {
  test('all inputs are rendered properly', () => {
    renderPage('testKey');
    expect(screen.getByLabelText('name-field')).toBeInTheDocument();
    expect(screen.getByLabelText('enter-button')).toBeInTheDocument();
  });

  test('error shown if the name field is empty', () => {
    renderPage('testKey');
    const enterButton = screen.getByLabelText('enter-button');
    fireEvent.click(enterButton);
    expect(screen.getByText(EMPTY_INPUT_ERROR)).toBeInTheDocument();
  });
});
