import { CSSProperties } from 'react';
import WordViewState from '../../types/WordViewState';

export default function generateWordPositionCSSProperties(
  wordViewState: WordViewState,
): CSSProperties {
  const style: CSSProperties = {
    position: 'absolute',
    top: `${wordViewState.yPercentage}%`,
    left: `${wordViewState.xPercentage}%`,
    transform: 'translateY(-100%)',
  };

  // If the word is in the right-half...
  if (wordViewState.xPercentage > 50) {
    style.transform = 'translate(-100%, -100%)';
  }

  return style;
}
