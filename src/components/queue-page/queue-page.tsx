import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import React, { useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { sleep } from 'utils/utils';
import { Queue } from './queue';
import styles from './queue-page.module.css';

const queueSize = 7;
const queue = new Queue<TDataElement>(queueSize);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const initialQueueElements = Array.from({ length: queueSize }, () => ({
    value: '',
    state: ElementStates.Default,
  }));
  const [queueElements, setQueueElements] =
    useState<(TDataElement | null)[]>(initialQueueElements);
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAddClick = async () => {
    console.log(queue)
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    queue.enqueue({
      value: inputValue,
      state: ElementStates.Changing,
    });
    setQueueElements([...queue.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    const lastElement = queue.peek();
    if (!queue.isEmpty() && lastElement) {
      console.log(lastElement)
      lastElement.state = ElementStates.Default;
    }
    setQueueElements([...queue.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
  };

  const handleDeleteClick = async () => {};

  const handleClearClick = async () => {};

  return (
    <SolutionLayout title='Очередь'>
      <div className={styles.pageContainer}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={handleInputChange}
        />
        <Button
          disabled={
            inProgress || inputValue.length === 0 || queueElements.length > 9
          }
          text='Добавить'
          onClick={handleAddClick}
        />
        <Button
          disabled={inProgress || queueElements.length === 0}
          text='Удалить'
          extraClass={'mr-40'}
          onClick={handleDeleteClick}
        />
        <Button
          disabled={inProgress || queueElements.length === 0}
          text='Очистить'
          onClick={handleClearClick}
        />
      </div>
      <ul className={styles.queueContainer}>
        {queueElements.map((element: TDataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? 'head' : ''}
            tail={element?.isTail ? 'tail' : ''}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
