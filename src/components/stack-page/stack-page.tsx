import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import React, { useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { sleep } from 'utils/utils';
import { stack } from './stack';
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [stackElements, setStackElements] = useState<(TDataElement | null)[]>(
    [],
  );
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAddClick = async () => {
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.isHead = false;
    }
    stack.push({
      value: inputValue,
      state: ElementStates.Changing,
      isHead: true,
    });
    setStackElements([...stack.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
    }
    setStackElements([...stack.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
    setInputValue('');
  };

  const handleDeleteClick = async () => {
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Changing;
    }
    setStackElements([...stack.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackElements([...stack.getElements()]);
    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
      lastElement.isHead = true;
    }
    setStackElements([...stack.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
  };

  const handleClearClick = async () => {
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    stack.clear();
    setStackElements([...stack.getElements()]);
    setInProgress(false);
  };

  return (
    <SolutionLayout title='Стек'>
      <div className={styles.pageContainer}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={handleInputChange}
        />
        <Button
          disabled={
            inProgress || inputValue.length === 0 || stackElements.length > 9
          }
          text='Добавить'
          onClick={handleAddClick}
        />
        <Button
          disabled={inProgress || stackElements.length === 0}
          text='Удалить'
          extraClass={'mr-40'}
          onClick={handleDeleteClick}
        />
        <Button
          disabled={inProgress || stackElements.length === 0}
          text='Очистить'
          onClick={handleClearClick}
        />
      </div>
      <ul className={styles.stackContainer}>
        {stackElements.map((element: TDataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? 'top' : ''}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
