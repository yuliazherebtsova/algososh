import { ElementStates, TDataElement } from 'types/types';
import { swap } from 'utils/utils';

export const getSelectionSortSteps = (
  arrToSort: (TDataElement | null)[],
  isAscending: boolean,
) => {
  const arr = arrToSort ? [...arrToSort] : [];
  const steps: (TDataElement | null)[][] = [];
  if (isAscending) {
    // по возрастанию
    for (let i = 0; i < arr.length - 1; i++) {
      let indToSwap = i;
      arr[i] = {
        ...arr[i],
        state: ElementStates.Changing,
      } as TDataElement;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value < arr[indToSwap]!.value) {
          indToSwap = j;
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[i] = {
        ...arr[i],
        state: ElementStates.Default,
      } as TDataElement;
      swap(arr, i, indToSwap);
      arr[i] = {
        ...arr[i],
        state: ElementStates.Modified,
      } as TDataElement;
    }
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Modified,
    } as TDataElement;
    steps.push([...arr]);
  } else {
    // по убыванию
    for (let i = 0; i < arr.length - 1; i++) {
      let indToSwap = i;
      arr[i] = {
        ...arr[i],
        state: ElementStates.Changing,
      } as TDataElement;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value > arr[indToSwap]!.value) {
          indToSwap = j;
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[i] = {
        ...arr[i],
        state: ElementStates.Default,
      } as TDataElement;
      swap(arr, i, indToSwap);
      arr[i] = {
        ...arr[i],
        state: ElementStates.Modified,
      } as TDataElement;
    }
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Modified,
    } as TDataElement;
    steps.push([...arr]);
  }
  return steps;
};

export const getBubbleSortSteps = (
  arrToSort: (TDataElement | null)[],
  isAscending: boolean,
) => {
  const arr = arrToSort ? [...arrToSort] : [];
  const steps: (TDataElement | null)[][] = [];
  if (isAscending) {
    // по возрастанию
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value > arr[j + 1]!.value) {
          swap(arr, j, j + 1);
          steps.push([...arr]);
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[arr.length - i - 1] = {
        ...arr[arr.length - i - 1],
        state: ElementStates.Modified,
      } as TDataElement;
      arr[arr.length - 1] = {
        ...arr[arr.length - 1],
        state: ElementStates.Modified,
      } as TDataElement;
      steps.push([...arr]);
    }
  } else {
    // по убыванию
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value < arr[j + 1]!.value) {
          swap(arr, j, j + 1);
          steps.push([...arr]);
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[arr.length - i - 1] = {
        ...arr[arr.length - i - 1],
        state: ElementStates.Modified,
      } as TDataElement;
    }
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Modified,
    } as TDataElement;
    steps.push([...arr]);
  }
  return steps;
};
