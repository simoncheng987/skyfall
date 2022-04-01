import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import useWindowSize from '../../../utils/useWindowSize';
import HomePage from '../HomePage';

jest.mock('../../../utils/useWindowSize');
const mockUseWindowSize = useWindowSize as jest.MockedFunction<typeof useWindowSize>;

const createRoomText = 'Create Room';
const joinRoomText = 'Join Room';

describe('Default test', () => {
  it('home page', () => {
    mockUseWindowSize.mockReturnValue({
      width: 1920,
      height: 1080,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    expect(screen.getByText('Skyfall')).toBeInTheDocument();
    expect(screen.getByText(createRoomText)).toBeInTheDocument();
    expect(screen.getByText(joinRoomText)).toBeInTheDocument();
  });

  it('matches snapshot with home page', () => {
    mockUseWindowSize.mockReturnValue({
      width: 1920,
      height: 1080,
    });

    const tree = renderer
      .create(
        <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
          <HomePage />
        </MemoryRouter>,
      )
      .toTree();
    expect(tree).toMatchSnapshot();
  });

  it('routing from home page to create room page', () => {
    mockUseWindowSize.mockReturnValue({
      width: 1920,
      height: 1080,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText(createRoomText));

    expect(screen.getByText(createRoomText)).toBeInTheDocument();
  });

  it('routing from home page to join room page', () => {
    mockUseWindowSize.mockReturnValue({
      width: 1920,
      height: 1080,
    });

    render(<HomePage />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText(joinRoomText));

    expect(screen.getByText(joinRoomText)).toBeInTheDocument();
  });
});
