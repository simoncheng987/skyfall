import React from 'react';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ClientContext, ClientProviderProps } from '../../../context/ClientProvider';
import JoinRoom from '../index';
import { mockLargeWindowSize } from '../../../utils/useWindowSizeMocks';

if (!global.setImmediate) {
  // @ts-ignore
  global.setImmediate = setTimeout;
}

jest.mock('../../../utils/useWindowSize');

let mockedContext: DeepMockProxy<ClientProviderProps>;
beforeEach(() => {
  mockedContext = mockDeep<ClientProviderProps>();
});

function renderPage() {
  mockLargeWindowSize();

  render(
    <MemoryRouter initialEntries={['/join']}>
      <ClientContext.Provider value={mockedContext}>
        <JoinRoom />
      </ClientContext.Provider>
    </MemoryRouter>,
  );
}

const EMPTY_INPUT_ERROR = /Please complete both fields/i;

describe('JoinRoom', () => {
  test('all inputs are rendered properly', () => {
    renderPage();
    expect(screen.getByLabelText('name-input')).toBeInTheDocument();
    expect(screen.getByLabelText('room-id-input')).toBeInTheDocument();
    expect(screen.getByLabelText('join-button')).toBeInTheDocument();
  });

  test('error shown if both fields are empty', () => {
    renderPage();
    expect(screen.queryByText(EMPTY_INPUT_ERROR)).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('join-button'));
    expect(screen.getByText(EMPTY_INPUT_ERROR)).toBeInTheDocument();
  });

  test('error shown if the name field is empty', () => {
    renderPage();
    const roomIdField = screen.getByLabelText('room-id-input');
    fireEvent.change(roomIdField, { target: { value: 'testRoomId' } });
    expect(screen.queryByText(EMPTY_INPUT_ERROR)).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('join-button'));
    expect(screen.getByText(EMPTY_INPUT_ERROR)).toBeInTheDocument();
  });

  test('error shown if the room id field is empty', () => {
    renderPage();
    const roomIdField = screen.getByLabelText('name-input');
    fireEvent.change(roomIdField, { target: { value: 'testRoomId' } });
    expect(screen.queryByText(EMPTY_INPUT_ERROR)).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('join-button'));
    expect(screen.getByText(EMPTY_INPUT_ERROR)).toBeInTheDocument();
  });

  test('error not shown if both fields are filled', () => {
    renderPage();
    const nameField = screen.getByLabelText('name-input');
    fireEvent.change(nameField, { target: { value: 'testName' } });
    const roomIdField = screen.getByLabelText('room-id-input');
    fireEvent.change(roomIdField, { target: { value: 'testRoomId' } });
    fireEvent.click(screen.getByLabelText('join-button'));
    expect(screen.queryByText(EMPTY_INPUT_ERROR)).not.toBeInTheDocument();
    expect(mockedContext.setClient.mock.calls.length).toEqual(1);
  });
});
