import React from 'react';
import { render, screen } from '@testing-library/react';
import useWindowSize from '../../../utils/useWindowSize';
import PageScaffold from '../PageScaffold';

jest.mock('../../../utils/useWindowSize');
const mockUseWindowSize = useWindowSize as jest.MockedFunction<typeof useWindowSize>;

const errorMessage =
  'Oh no! Ensure that your monitor size is at least 1280 x 720, and display ratio is greater than 16:10';

const testComponent = (
  <PageScaffold>
    <p>Page</p>
  </PageScaffold>
);

describe('PageScaffold', () => {
  describe('Errors are displayed in certain size states', () => {
    it('shows error when width is smaller than 1280 pixels', () => {
      mockUseWindowSize.mockReturnValue({
        width: 500,
        height: 10000,
      });

      render(<PageScaffold>{testComponent}</PageScaffold>);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('shows error when height is greater than 720 pixels', () => {
      mockUseWindowSize.mockReturnValue({
        width: 1500,
        height: 500,
      });

      render(<PageScaffold>{testComponent}</PageScaffold>);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('shows error when width/height ratio is lower than 16/9', () => {
      mockUseWindowSize.mockReturnValue({
        width: 1500,
        height: 1500,
      });

      render(<PageScaffold>{testComponent}</PageScaffold>);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('displays the content else wise (under correct conditions)', () => {
    mockUseWindowSize.mockReturnValue({
      width: 1920,
      height: 1080,
    });

    render(<PageScaffold>{testComponent}</PageScaffold>);
    expect(screen.getByText('Page')).toBeInTheDocument();
  });
});
