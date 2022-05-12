import useWindowSize from './useWindowSize';

const mockedHook = useWindowSize as jest.MockedFunction<typeof useWindowSize>;

export function mockLargeWindowSize() {
  mockedHook.mockReturnValue({
    width: 1920,
    height: 1080,
  });
}

export function mockSmallWindowSize() {
  mockedHook.mockReturnValue({
    width: 1000,
    height: 562.5,
  });
}
