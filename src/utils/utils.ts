// меняет элементы массива местами
export const swap = (
  arr: any,
  firstIndex: number,
  secondIndex: number,
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const iterativeFib = (n: number) => {
  let sequence: number[] = [1, 1];
  if (n < 3) return [1];
  for (let i = 2; i <= n; i++) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2],
    );
  }
  console.log(sequence)
  return sequence;
};
