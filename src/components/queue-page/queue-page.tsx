import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import React, { useMemo, useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { sleep } from 'utils/utils';
import { Queue } from './queue';
import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const maxQueueSize = 7;
  const queue = useMemo(() => new Queue<TDataElement>(maxQueueSize), []);
  const [inputValue, setInputValue] = useState('');
  const initialQueueElements = Array.from({ length: maxQueueSize }, () => ({
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
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    let tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.isTail = false;
    }
    if (queue.isEmpty()) {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Changing,
        isHead: true,
        isTail: true,
      });
    } else {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Changing,
        isHead: false,
        isTail: true,
      });
    }
    setQueueElements([...queue.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.state = ElementStates.Default;
    }
    setQueueElements([...queue.getElements()]);
    setInProgress(false);
    setInputValue('');
  };

  const handleDeleteClick = async () => {
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    let head = queue.getHeadElement();
    let tail = queue.getTailElement();
    if (!queue.isEmpty() && head?.value) {
      head.value.state = ElementStates.Changing;
      setQueueElements([...queue.getElements()]);
      await sleep(SHORT_DELAY_IN_MS);
      head.value.isHead = false;
      queue.dequeue();
    }
    if (head?.index === tail?.index) {
      queue.clear();
    }
    head = queue.getHeadElement();
    if (!queue.isEmpty() && head?.value) {
      head.value.isHead = true;
      setQueueElements([...queue.getElements()]);
    }
    setQueueElements([...queue.getElements()]);
    await sleep(SHORT_DELAY_IN_MS);
    if (head?.value) {
      head.value.state = ElementStates.Default;
    }
    setQueueElements([...queue.getElements()]);
    setInProgress(false);
    setInputValue('');
  };

  const handleClearClick = async () => {
    setInProgress(true);
    await sleep(SHORT_DELAY_IN_MS);
    queue.clear();
    setQueueElements([...initialQueueElements]);
    setInProgress(false);
    setInputValue('');
  };

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
            inProgress ||
            inputValue.length === 0 ||
            queueElements.length > maxQueueSize
          }
          text='Добавить'
          onClick={handleAddClick}
        />
        <Button
          disabled={inProgress || queue.isEmpty()}
          text='Удалить'
          extraClass={'mr-40'}
          onClick={handleDeleteClick}
        />
        <Button
          disabled={inProgress || queue.isEmpty()}
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
