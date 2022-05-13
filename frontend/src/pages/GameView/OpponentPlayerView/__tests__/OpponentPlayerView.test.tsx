import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import WordState from '../../../../types/WordState';
import OpponentPlayerView from '../index';

const allWords: WordState[] = [];

beforeAll(() => {
  allWords.push({
    wordId: '1',
    word: 'WordOne',
    xPercentage: 10,
    yPercentage: 50,
    time: 0,
  });

  allWords.push({
    wordId: '2',
    word: 'WordTwo',
    xPercentage: 70,
    yPercentage: 100,
    time: 0,
  });
});

function componentFactory(
  playerName: string,
  remainingLives: number,
  totalLives: number,
  words: WordState[],
) {
  return (
    <OpponentPlayerView
      playerName={playerName}
      remainingLives={remainingLives}
      totalLives={totalLives}
      words={words}
    />
  );
}

function defaultComponent() {
  return componentFactory('player-name', 3, 5, allWords);
}

describe('OpponentPlayerView', () => {
  test('displays player name on the screen', () => {
    render(defaultComponent());
    expect(screen.getByText('player-name')).toBeInTheDocument();
  });

  test('displays words passed through props on the screen', () => {
    const playerName = 'player-name';
    render(componentFactory(playerName, 3, 5, allWords));
    allWords.forEach((word) => expect(screen.getByText(word.word)).toBeInTheDocument());
  });

  test('snapshot test', () => {
    const tree = renderer.create(defaultComponent()).toTree();
    expect(tree).toMatchSnapshot();
  });
});
