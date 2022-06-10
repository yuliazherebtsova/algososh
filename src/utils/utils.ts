// меняет элементы массива местами
export const swap = (
  arr: number[],
  firstIndex: number,
  secondIndex: number,
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
