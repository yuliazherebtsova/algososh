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

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const iterativeFib = (n: number) => {
  let sequence: number[] = [1, 1];
  if (n < 3) return [1];
  for (let i = 2; i <= n; i++) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2],
    );
  }
  console.log(sequence);
  return sequence;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[i] < arr[j + 1]) {
        // сортируем элементы по возрастанию
        //swap(arr[i], arr[j + 1]);
      }
    }
  }
};
