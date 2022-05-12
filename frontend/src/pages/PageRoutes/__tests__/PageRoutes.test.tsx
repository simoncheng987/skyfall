/* eslint-disable react/display-name,react/function-component-definition */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockLargeWindowSize } from '../../../utils/useWindowSizeMocks';
import PageRoutes from '../PageRoutes';

jest.mock('../../../utils/useWindowSize');

// Mocking the components used by the PageRoutes file.
jest.mock('../../Home', () => () => <p>home</p>);
jest.mock('../../JoinRoom', () => () => <p>join-room</p>);
jest.mock('../../CreateRoom', () => () => <p>create-room</p>);

mockLargeWindowSize();

describe('PageRoutes', () => {
  test('/ route shows the Home component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PageRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  test('/create route shows the CreateRoom component', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <PageRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('create-room')).toBeInTheDocument();
  });

  test('/join route shows the JoinRoom component', () => {
    render(
      <MemoryRouter initialEntries={['/join']}>
        <PageRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('join-room')).toBeInTheDocument();
  });
});

jest.clearAllMocks();
