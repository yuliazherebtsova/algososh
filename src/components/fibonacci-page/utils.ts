export const iterativeFib = (n: number) => {
  let sequence: number[] = [1, 1];
  if (n < 3) return [1];
  for (let i = 2; i <= n; i++) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2],
    );
  }
  return sequence;
};
