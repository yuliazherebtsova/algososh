import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { DELAY_IN_MS } from 'constants/delays';
import React, { FC, useEffect, useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { updateElementsWithInterval } from 'utils/utils';
import styles from './string-page.module.css';
import { getReversingStringSteps } from './utils';

export const StringPage: FC = () => {
  const [inputString, setInputString] = useState('');
  const [letters, setLetters] = useState<(TDataElement | null)[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputString(evt.currentTarget.value);
  };

  const reverseString = async () => {
    setInProgress(true);
    const inputLetters: TDataElement[] = [];
    inputString.split('').forEach((element) => {
      inputLetters.push({ value: element, state: ElementStates.Default });
    });
    const steps = getReversingStringSteps(inputString);
    let currentStep = 0;
    while (currentStep < steps.length) {
      if (steps) {
        await updateElementsWithInterval(
          setLetters,
          [...inputLetters],
          DELAY_IN_MS,
          isComponentMounted,
        );
        let leftIndex = currentStep;
        let rightIndex = inputLetters.length - currentStep - 1;
        inputLetters[currentStep].state = ElementStates.Changing;
        inputLetters[inputLetters.length - currentStep - 1].state =
          ElementStates.Changing;
        await updateElementsWithInterval(
          setLetters,
          [...inputLetters],
          DELAY_IN_MS,
          isComponentMounted,
        );
        inputLetters[leftIndex].state = ElementStates.Modified;
        inputLetters[rightIndex].state = ElementStates.Modified;
        inputLetters[leftIndex].value = steps[currentStep][leftIndex];
        inputLetters[rightIndex].value = steps[currentStep][rightIndex];
        currentStep++;
      }
    }
    setInputString('');
    setInProgress(false);
  };

  const handleSubmitButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    reverseString();
  };

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.formContainer} onSubmit={handleSubmitButtonClick}>
        <Input
          value={inputString}
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
        />
        <Button
          text='Развернуть'
          type='submit'
          disabled={!inputString}
          isLoader={inProgress}
        />
      </form>
      <ul className={styles.lettersList}>
        {letters.map((letter, index) => (
          <Circle
            state={letter?.state}
            letter={letter?.value.toString()}
            key={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
