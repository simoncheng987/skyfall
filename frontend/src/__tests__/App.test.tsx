import React from 'react';
import { render, screen } from '@testing-library/react';
import useWindowSize from '../utils/useWindowSize';
import App from '../App';

jest.mock('../utils/useWindowSize');
const mockUseWindowSize = useWindowSize as jest.MockedFunction<typeof useWindowSize>;

const createRoomText = 'Create Room';
const joinRoomText = 'Join Room';

describe('Default test', () => {
  it('display Skyfall', () => {
    mockUseWindowSize.mockReturnValue({
      width: 1920,
      height: 1080,
    });

    render(<App />);
    expect(screen.getByText('Skyfall')).toBeInTheDocument();
    expect(screen.getByText(createRoomText)).toBeInTheDocument();
    expect(screen.getByText(joinRoomText)).toBeInTheDocument();
  });
});
