import React, { useEffect, useState } from 'react';
import styles from './fibonacci-page.module.css';
import { updateElementsWithInterval } from 'utils/utils';
import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ElementStates, TDataElement } from 'types/types';
import { iterativeFib } from './utils';

export const FibonacciPage: React.FC = () => {
  const [inputNumber, setInputNumber] = useState<number>(-1);
  const [generatedNumbers, setGeneratedNumbers] = useState<
    (TDataElement | null)[]
  >([]);
  const [inProgress, setInProgress] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const inputNumber = parseFloat(evt.currentTarget.value);
    setInputNumber(inputNumber);
  };

  const generateFibonacci = async () => {
    setInProgress(true);
    const fibonacciNumbers = inputNumber ? [...iterativeFib(inputNumber)] : [];
    const numbersToRender: TDataElement[] = [];
    for (let i = 0; i < fibonacciNumbers.length; i++) {
      numbersToRender.push({
        value: fibonacciNumbers[i].toString(),
        state: ElementStates.Default,
      });
      await updateElementsWithInterval(
        setGeneratedNumbers,
        numbersToRender,
        SHORT_DELAY_IN_MS,
        isComponentMounted,
      );
    }
    setInProgress(false);
    setInputNumber(-1);
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
          disabled={
            inputNumber
              ? inputNumber > 19 ||
                inputNumber < 1 ||
                ~~inputNumber !== inputNumber
              : true
          }
          isLoader={inProgress}
        />
      </form>
      <ul className={styles.numbersList}>
        {generatedNumbers.slice(0, 10).map((number, index) => (
          <Circle
            state={number?.state}
            letter={number?.value.toString()}
            key={index}
            index={index}
          />
        ))}
      </ul>
      <ul className={styles.numbersList}>
        {generatedNumbers.slice(10, 20).map((number, index) => (
          <Circle
            state={number?.state}
            letter={number?.value.toString()}
            key={index}
            index={index + 10}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
