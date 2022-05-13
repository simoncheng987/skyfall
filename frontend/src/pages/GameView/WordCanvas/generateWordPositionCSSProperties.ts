import { CSSProperties } from 'react';
import WordState from '../../../types/WordState';

/**
 * This helper function is used to calculate the rendering position of words on WordCanvas, based
 * on the word's state in the WordState interface. This helper function is required because if the
 * x-position of a word in WordState is 100%, the word should be offset slightly to the left on the
 * x-axis when being rendered, because we don't want it to exceed the screen.
 */
export default function generateWordPositionCSSProperties(wordViewState: WordState): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    top: `${wordViewState.yPercentage}%`,
    left: `${wordViewState.xPercentage}%`,
    transform: 'translateY(-80%)',
  };

  /*
  If the word's x-coordinate is more than 50%, then apply the horizontal left offset to ensure that
  it does not exceed the bounds of the rendering screen. Hence, we apply -100% offset.
   */
  if (wordViewState.xPercentage > 50) {
    style.transform = 'translate(-100%, -80%)';
  }

  return style;
}
