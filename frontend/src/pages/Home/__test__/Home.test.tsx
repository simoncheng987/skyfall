/* eslint-disable testing-library/render-result-naming-convention */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { MemoryHistory, createMemoryHistory } from 'history';
import Home from '../Home';
import { mockLargeWindowSize, mockSmallWindowSize } from '../../../utils/useWindowSizeMocks';

jest.mock('../../../utils/useWindowSize');

function componentWithRouterFactory(memoryHistory: MemoryHistory) {
  return (
    <Router location={memoryHistory.location} navigator={memoryHistory}>
      <Home />
    </Router>
  );
}

function renderComponentWithRouter() {
  const memoryHistory = createMemoryHistory({ initialEntries: ['/'] });
  render(componentWithRouterFactory(memoryHistory));
  return memoryHistory;
}

const SMALL_SCREEN_ERROR =
  /Oh no! Ensure that your monitor size is at least 1280 x 720, and display ratio is greater than 16:10/i;

describe('Home', () => {
  test('all component are rendered to the screen', () => {
    mockLargeWindowSize();
    renderComponentWithRouter();
    expect(screen.getByText('Skyfall')).toBeInTheDocument();
    expect(screen.getByLabelText('create-room-button')).toBeInTheDocument();
    expect(screen.getByLabelText('join-room-button')).toBeInTheDocument();
    expect(screen.getByLabelText('upload-words-button')).toBeInTheDocument();
    expect(screen.getByLabelText('leaderboard-icon')).toBeInTheDocument();
  });

  test('integration test: PageScaffold error is rendered in small screens', () => {
    mockSmallWindowSize();
    renderComponentWithRouter();
    expect(screen.getByText(SMALL_SCREEN_ERROR)).toBeInTheDocument();
  });

  it('routing from Home to CreateRoom page', () => {
    mockLargeWindowSize();
    const history = renderComponentWithRouter();
    const createRoomButton = screen.getByLabelText('create-room-button');
    fireEvent.click(createRoomButton);
    expect(history.location.pathname).toEqual('/create');
  });

  it('routing from Home to JoinRoom page', () => {
    mockLargeWindowSize();
    const history = renderComponentWithRouter();
    const joinRoomButton = screen.getByLabelText('join-room-button');
    fireEvent.click(joinRoomButton);
    expect(history.location.pathname).toEqual('/join');
  });

  it('routing from Home to UploadWords page', () => {
    mockLargeWindowSize();
    const history = renderComponentWithRouter();
    const uploadWordsButton = screen.getByLabelText('upload-words-button');
    fireEvent.click(uploadWordsButton);
    expect(history.location.pathname).toEqual('/upload-words');
  });
});
