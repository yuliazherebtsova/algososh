import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { DELAY_IN_MS } from 'constants/delays';
import React, { FC, useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { sleep, swap } from 'utils/utils';
import styles from './string-page.module.css';

export const StringComponent: FC = () => {
  const [inputString, setInputString] = useState('');
  const [inputLetters, setInputLetters] = useState<TDataElement[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputString(evt.currentTarget.value);
  };

  const reverseString = async () => {
    setInProgress(true);
    const letters: TDataElement[] = [];
    inputString.split('').forEach((element) => {
      letters.push({ value: element, state: ElementStates.Default });
    });
    setInputLetters([...letters]);
    await sleep(DELAY_IN_MS);
    let start = 0;
    let end = letters.length - 1;
    while (start <= end) {
      if (end === start) {
        letters[start].state = ElementStates.Modified;
        setInputLetters([...letters]);
        setInProgress(false);
        break;
      } else {
        letters[start].state = ElementStates.Changing;
        letters[end].state = ElementStates.Changing;
        setInputLetters([...letters]);
        await sleep(DELAY_IN_MS);
        swap(letters, start, end);
        letters[start].state = ElementStates.Modified;
        letters[end].state = ElementStates.Modified;
        setInputLetters([...letters]);
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
            state={letter.state}
            letter={letter.value.toString()}
            key={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
