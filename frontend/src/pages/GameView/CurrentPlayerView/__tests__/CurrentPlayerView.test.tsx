import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CurrentPlayerView from '../index';
import WordState from '../../../../types/WordState';

const words: WordState[] = [];
let mockCallback: jest.Mock<any, any>;

beforeAll(() => {
  words.push({
    wordId: '1',
    word: 'WordOne',
    xPercentage: 10,
    yPercentage: 50,
    time: 0,
  });

  words.push({
    wordId: '2',
    word: 'WordTwo',
    xPercentage: 70,
    yPercentage: 100,
    time: 0,
  });
});

beforeEach(() => {
  mockCallback = jest.fn();
});

describe('CurrentPlayerView', () => {
  test('displays the player name on the screen', () => {
    render(
      <CurrentPlayerView
        onWordSubmit={mockCallback}
        playerName="testPlayerName"
        remainingLives={2}
        totalLives={3}
        words={words}
      />,
    );

    expect(screen.getByText('testPlayerName')).toBeInTheDocument();
  });

  test('displays words passed through props on the screen', () => {
    render(
      <CurrentPlayerView
        onWordSubmit={mockCallback}
        playerName="testPlayerName"
        remainingLives={2}
        totalLives={3}
        words={words}
      />,
    );

    words.forEach((word) => {
      expect(screen.getByText(word.word)).toBeInTheDocument();
    });
  });

  test('callback function invoked when word is submitted', () => {
    render(
      <CurrentPlayerView
        onWordSubmit={mockCallback}
        playerName="testPlayerName"
        remainingLives={2}
        totalLives={3}
        words={words}
      />,
    );

    const wordInput = screen.getByLabelText('word-input');
    const wordForm = screen.getByLabelText('word-form');
    fireEvent.input(wordInput, { target: { value: 'testPlayerName' } });
    fireEvent.submit(wordForm, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('testPlayerName');
  });
});
