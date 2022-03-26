import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export default function useWindowSize(): WindowSize {
  if (window === undefined) {
    return {
      width: 1200,
      height: 800,
    };
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return windowSize;
}
