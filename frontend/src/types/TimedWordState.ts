import WordState from './WordState';

/**
 * Used to track the position of a word on the WordCanvas component.
 */
export default interface TimedWordState extends WordState {
  /**
   * The timeout for informing the backend that the word is not typed.
   */
  timeout: ReturnType<typeof setTimeout>;
}
