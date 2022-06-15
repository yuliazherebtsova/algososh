import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { DELAY_IN_MS } from 'constants/delays';
import React, { FC, useEffect, useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { swap, updateElementsWithInterval } from 'utils/utils';
import styles from './string-page.module.css';

export const StringPage: FC = () => {
  const [inputString, setInputString] = useState('');
  const [inputLetters, setInputLetters] = useState<(TDataElement | null)[]>([]);
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
    const letters: TDataElement[] = [];
    inputString.split('').forEach((element) => {
      letters.push({ value: element, state: ElementStates.Default });
    });
    let start = 0;
    let end = letters.length - 1;
    while (start <= end) {
      if (end === start) {
        letters[start].state = ElementStates.Modified;
        setInProgress(false);
        break;
      } else {
        letters[start].state = ElementStates.Changing;
        letters[end].state = ElementStates.Changing;
        await updateElementsWithInterval(
          setInputLetters,
          letters,
          DELAY_IN_MS,
          isComponentMounted,
        );
        swap(letters, start, end);
        letters[start].state = ElementStates.Modified;
        letters[end].state = ElementStates.Modified;
        await updateElementsWithInterval(
          setInputLetters,
          letters,
          DELAY_IN_MS,
          isComponentMounted,
        );
        start++;
        end--;
      }
    }
    setInProgress(false);
  };

  const handleSubmitButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    reverseString();
  };

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.formContainer} onSubmit={handleSubmitButtonClick}>
        <Input isLimitText={true} maxLength={11} onChange={handleInputChange} />
        <Button
          text='Развернуть'
          type='submit'
          disabled={!inputString}
          isLoader={inProgress}
        />
      </form>
      <ul className={styles.lettersList}>
        {inputLetters.map((letter, index) => (
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
