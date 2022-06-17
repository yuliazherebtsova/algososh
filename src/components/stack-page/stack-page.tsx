import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import React, { useEffect, useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { updateElementsWithInterval } from 'utils/utils';
import { stack } from './stack';
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [stackElements, setStackElements] = useState<(TDataElement | null)[]>(
    [],
  );
  const [inProgress, setInProgress] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAddClick = async () => {
    setInProgress(true);
    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.isHead = false;
    }
    stack.push({
      value: inputValue,
      state: ElementStates.Changing,
      isHead: true,
    });
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
    }
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
    setInputValue('');
  };

  const handleDeleteClick = async () => {
    setInProgress(true);
    let lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Changing;
    }
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    stack.pop();
    lastElement = stack.peek();
    if (!stack.isEmpty() && lastElement) {
      lastElement.state = ElementStates.Default;
      lastElement.isHead = true;
    }
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
    setInProgress(false);
  };

  const handleClearClick = async () => {
    setInProgress(true);
    stack.clear();
    await updateElementsWithInterval(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted,
    );
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
