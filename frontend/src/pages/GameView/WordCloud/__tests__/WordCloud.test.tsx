import React from 'react';
import { render, screen } from '@testing-library/react';
import WordCloud from '../index';

const word = 'testWord';
const SMALL_X_PADDING_FACTOR = 2;
const LARGE_X_PADDING_FACTOR = 3;
const SMALL_Y_PADDING = word.length < 8 ? 20 : 25;
const LARGE_Y_PADDING = word.length < 8 ? 25 : 35;

const renderWord = (size: 'SMALL' | 'LARGE') => {
  render(<WordCloud size={size} word={word} />);
};

describe('WordCloud', () => {
  test('renders the word correctly to the screen in SMALL size', () => {
    renderWord('SMALL');
    expect(screen.getByText(word)).toBeInTheDocument();
  });

  test('renders the word correctly to the screen in LARGE size', () => {
    renderWord('LARGE');
    expect(screen.getByText(word)).toBeInTheDocument();
  });

  describe('Font Size', () => {
    test('font size is set correctly for SMALL sized words', () => {
      renderWord('SMALL');
      expect(screen.getByText(word)).toHaveStyle('font-size: 11px');
    });

    test('font size is set correctly for LARGE sized words', () => {
      renderWord('LARGE');
      expect(screen.getByText(word)).toHaveStyle('font-size: 15px');
    });
  });

  describe('Padding', () => {
    test('paddings in both directions are setup correctly for SMALL sized words', () => {
      renderWord('SMALL');
      const xPadding = SMALL_X_PADDING_FACTOR * word.length;
      expect(screen.getByText(word)).toHaveStyle(`padding: ${SMALL_Y_PADDING}px ${xPadding}px`);
    });

    test('paddings in both directions are setup correctly for LARGE sized words', () => {
      renderWord('LARGE');
      const xPadding = LARGE_X_PADDING_FACTOR * word.length;
      expect(screen.getByText(word)).toHaveStyle(`padding: ${LARGE_Y_PADDING}px ${xPadding}px`);
    });
  });
});
