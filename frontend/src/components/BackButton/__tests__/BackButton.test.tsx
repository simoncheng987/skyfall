import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { createMemoryHistory, MemoryHistory } from 'history';
import BackButton from '../BackButton';

function backButtonWithRouterFactory(memoryHistory: MemoryHistory) {
  return (
    <Router location={memoryHistory.location} navigator={memoryHistory}>
      <BackButton />
    </Router>
  );
}

function createComponentWithRouter() {
  const memoryHistory = createMemoryHistory({ initialEntries: ['/', '/test-entry'] });
  render(backButtonWithRouterFactory(memoryHistory));
  return memoryHistory;
}

describe('BackButton', () => {
  test('the back button is rendered on the screen', () => {
    createComponentWithRouter();
    expect(screen.getByLabelText('back-button')).toBeInTheDocument();
  });

  test('snapshot test of the rendered back button', () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={[{ pathname: '/test-pathname', key: 'test-key' }]}>
          <BackButton />
        </MemoryRouter>,
      )
      .toTree();
    expect(tree).toMatchSnapshot();
  });

  test('clicking the back button redirects user to root path (/)', () => {
    const mockHistory = createComponentWithRouter();
    const backButton = screen.getByLabelText('back-button');
    fireEvent.click(backButton);
    expect(mockHistory.location.pathname).toEqual('/');
  });
});
