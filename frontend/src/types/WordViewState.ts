/**
 * Used to track the position of a word on the WordCanvas component.
 */
export default interface WordViewState {
  word: string;

  /*
  It is assumed that the values below are within the 0 - 100 range (inclusive). If this constraint
  is not respected, then the users' of this interface may not behave as expected.
   */
  xPercentage: number;
  yPercentage: number;
}
