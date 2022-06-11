import React, { useState } from 'react';
import styles from './fibonacci-page.module.css';
import { iterativeFib, sleep } from 'utils/utils';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ElementStates, TDataElement } from 'types/types';

export const FibonacciPage: React.FC = () => {
  const [inputNumber, setInputNumber] = useState<number>();
  const [generatedNumbers, setGeneratedNumbers] = useState<TDataElement[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const input = parseInt(evt.currentTarget.value);
    setInputNumber(input);
  };

  const generateFibonacci = async () => {
    setInProgress(true);
    const fibonacciNumbers = inputNumber
      ? [...iterativeFib(inputNumber)]
      : [];
    const numbersToRender: TDataElement[] = [];
    await sleep(SHORT_DELAY_IN_MS);
    fibonacciNumbers.forEach((element) => {
      numbersToRender.push({
        value: element.toString(),
        state: ElementStates.Default,
      });
      setGeneratedNumbers([...numbersToRender]);
    });
    setInProgress(false);
  };

  const handleSubmitButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    generateFibonacci();
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={styles.formContainer} onSubmit={handleSubmitButtonClick}>
        <Input
          placeholder='Введите число от 1 до 19'
          type='number'
          min={1}
          isLimitText={true}
          maxLength={2}
          max={19}
          onChange={handleInputChange}
        />
        <Button
          text='Рассчитать'
          type='submit'
          disabled={inputNumber ? inputNumber > 19 : true}
          isLoader={inProgress}
        />
      </form>
      <ul className={styles.numbersList}>
        {generatedNumbers.slice(0, 10).map((number, index) => (
          <Circle
            state={number.state}
            letter={number.value.toString()}
            key={index}
            index={index}
          />
        ))}
      </ul>
      <ul className={styles.numbersList}>
        {generatedNumbers.slice(10, 20).map((number, index) => (
          <Circle
            state={number.state}
            letter={number.value.toString()}
            key={index}
            index={index+10}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
