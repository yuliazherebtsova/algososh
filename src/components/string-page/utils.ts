import { ElementStates } from 'types/types';

export function getReversingStringSteps(sourceString: string): string[][] {
  return [[]];
}

export function getLetterState(/*...*/): ElementStates {
  return ElementStates.Modified;
  // or

  return ElementStates.Changing;
  // or

  return ElementStates.Default;
}
