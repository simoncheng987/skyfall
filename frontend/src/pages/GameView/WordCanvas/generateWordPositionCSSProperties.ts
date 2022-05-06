import { CSSProperties } from 'react';
import WordState from '../../../types/WordState';

export default function generateWordPositionCSSProperties(wordViewState: WordState): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    top: `${wordViewState.yPercentage}%`,
    left: `${wordViewState.xPercentage}%`,
    transform: 'translateY(-80%)',
  };

  // If the word is in the right-half...
  if (wordViewState.xPercentage > 50) {
    style.transform = 'translate(-100%, -80%)';
  }

  return style;
}
