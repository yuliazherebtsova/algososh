import { swap } from 'utils/utils';

export const getSelectionSortSteps = (
  arr: number[],
  isAscending: boolean,
): number[][] => {
  const steps: number[][] = [];
  if (isAscending) {
    // по возрастанию
    for (let i = 0; i < arr.length - 1; i++) {
      let indToSwap = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[indToSwap]) {
          indToSwap = j;
        }
      }
      swap(arr, i, indToSwap);
      steps.push([...arr]);
    }
  } else {
    // по убыванию
    for (let i = 0; i < arr.length - 1; i++) {
      let indToSwap = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] > arr[indToSwap]) {
          indToSwap = j;
        }
      }
      swap(arr, i, indToSwap);
      steps.push(arr);
    }
  }
  console.log(steps);
  return steps;
};
