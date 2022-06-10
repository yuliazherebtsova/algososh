import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import React, { FC, useState } from 'react';
import { ElementStates, TLetter } from 'types/types';
import styles from './string.module.css';

export const StringComponent: FC = () => {
  const [inputString, setInputString] = useState('');
  const [inputLetters, setInputLetters] = useState<TLetter[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputString(e.currentTarget.value);
  };

  const reverseString = () => {
    //valueSetter('');
    setInProgress(true);
    const letters: TLetter[] = [];
    inputString.split('').forEach((el) => {
      letters.push({ char: el, state: ElementStates.Default });
    });
    setInputLetters(letters);
    //lettersSetter([...charsArr]);
    //await sleep(1000);
    //for (
    // let arr = charsArr, start = 0, end = arr.length - 1;
    // end >= start;
    // start++, end--
    //) {
    //  if (end === start) {
    //charsArr[start].state = ElementStates.Modified;
    //lettersSetter([...charsArr]);
    //await sleep(1000);
    //progressSetter(false);
    // } else {
    //  charsArr[start].state = ElementStates.Changing;
    //  charsArr[end].state = ElementStates.Changing;
    //lettersSetter([...charsArr]);
    //await sleep(1000);
    //swapElements(charsArr, start, end);
    // charsArr[start].state = ElementStates.Modified;
    //  charsArr[end].state = ElementStates.Modified;
    //lettersSetter([...charsArr]);
    //await sleep(1000);
    //}
    // }
    //progressSetter(false);
  };

  const handleReverseButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    reverseString();
  };

  return (
    <SolutionLayout title='Строка'>
      <form
        className={styles.formContainer}
        onSubmit={handleReverseButtonClick}
      >
        <Input isLimitText={true} maxLength={11} onChange={handleInputChange} />
        <Button text='Развернуть' type='submit' disabled={!inputString} />
      </form>
      <ul className={styles.lettersList}>
        {inputLetters.map((letter, index) => (
          <Circle state={letter.state} letter={letter.char} key={index} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
