import { TDataElement } from 'types/types';

export const swap = <T>(arr: T[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const updateElementsWithInterval = async (
  setState: (elements: (TDataElement | null)[]) => void,
  elements: (TDataElement | null)[],
  delay: number,
  isComponentMounted: boolean,
) => {
  await sleep(delay);
  if (isComponentMounted) {
    setState([...elements]);
  }
};
