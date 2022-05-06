import WordState from './WordState';

/**
 * Used to track the position of a word on the WordCanvas component.
 */
export default interface TimedWordState extends WordState {
  timeout: ReturnType<typeof setTimeout>;
}
