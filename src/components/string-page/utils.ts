import { ElementStates } from 'types/types';
import { swap } from 'utils/utils';

export function getReversingStringSteps(sourceString: string): string[][] {
  const steps: string[][] = [];
  const letters = sourceString.split('');
  let start = 0;
  let end = letters.length - 1;
  // if (end === start) {
  //   steps.push(letters);
  //   return steps;
  // }
  while (start <= end) {
    if (end === start) {
      steps.push([...letters]);
      break;
    } else {
      swap(letters, start, end);
      steps.push([...letters]);
      start++;
      end--;
    }
  }
  return steps;
}

export function getLetterState(/*...*/): ElementStates {
  return ElementStates.Modified;
  // or

  return ElementStates.Changing;
  // or

  return ElementStates.Default;
}
