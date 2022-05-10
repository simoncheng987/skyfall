import React from 'react';
import { render, screen } from '@testing-library/react';
import WordState from '../../../../types/WordState';
import WordCanvas from '../index';

const words: WordState[] = [];

beforeAll(() => {
  // Note that 'time' in these objects is just a placeholder, i.e., not used in any ways.
  words.push({
    wordId: '1',
    word: 'Player',
    xPercentage: 10,
    yPercentage: 50,
    time: 0,
  });

  words.push({
    wordId: '2',
    word: 'Opponent',
    xPercentage: 70,
    yPercentage: 100,
    time: 0,
  });
});

describe('WordCanvas', () => {
  it('both words are rendered onto the screen somewhere', () => {
    render(<WordCanvas words={words} wordSize="SMALL" />);

    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.getByText('Opponent')).toBeInTheDocument();
  });

  it('renders word with x-coordinate less than or equal to 50 correctly', () => {
    render(<WordCanvas words={words} wordSize="SMALL" />);
    const playerWord = screen.getByText('Player');

    expect(playerWord).toHaveStyle(`top: ${words[0].yPercentage}%`);
    expect(playerWord).toHaveStyle(`left: ${words[0].xPercentage}%`);
    expect(playerWord).toHaveStyle(`transform: translateY(-80%)`);
  });

  it('renders word with x-coordinate more than 50 correctly', () => {
    render(<WordCanvas words={words} wordSize="SMALL" />);
    const opponentWord = screen.getByText('Opponent');

    expect(opponentWord).toHaveStyle(`top: ${words[1].yPercentage}%`);
    expect(opponentWord).toHaveStyle(`left: ${words[1].xPercentage}%`);
    expect(opponentWord).toHaveStyle(`transform: translate(-100%, -80%)`);
  });
});
