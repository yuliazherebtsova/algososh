import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { ArrowIcon } from 'components/ui/icons/arrow-icon';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ElementStates, TDataElement } from 'types/types';
import { sleep } from 'utils/utils';
import { LinkedList } from './list';
import styles from './list-page.module.css';

export const ListPage: FC = () => {
  const list = useMemo(() => new LinkedList<string | number>(), []);
  const initialListElements = useMemo(() => ['0', '34', '8', '1'], []);
  const initialList: TDataElement[] = useMemo(() => [], []);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [listElements, setListElements] = useState<TDataElement[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [isAddingHead, setIsAddingHead] = useState(false);
  const [isDeletingHead, setIsDeletingHead] = useState(false);
  const [isAddingTail, setIsAddingTail] = useState(false);
  const [isDeletingTail, setIsDeletingTail] = useState(false);
  const [isAddingAtIndex, setIsAddingAtIndex] = useState(false);
  const [isDeletingAtIndex, setIsDeletingAtIndex] = useState(false);

  useEffect(() => {
    initialListElements.forEach((element) => {
      initialList.push({
        value: element,
        state: ElementStates.Default,
        isHead: false,
        isTail: false,
        isLinked: true,
      });
    });
    initialList[0].isHead = true;
    initialList[initialList.length - 1].isTail = true;
    initialList[initialList.length - 1].isLinked = false;
    setListElements(initialList);
  }, [initialList, initialListElements]);

  const handleInputValueChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleInputIndexChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(evt.currentTarget.value);
  };

  const handleAddToHeadClick = async () => {
    setInProgress(true);
    setIsAddingHead(true);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[0].isHead = false;
    listElements[0].isLinked = true;
    listElements[0].positionToChange = true;
    listElements[0].valueToChange = inputValue;
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[0].positionToChange = false;
    list.prepend(inputValue);
    const head = list.getNodeByIndex(0);
    listElements.unshift({
      value: head ? head : '',
      state: ElementStates.Modified,
      isHead: true,
      isTail: false,
      isLinked: true,
    });
    setListElements([...listElements]);
    listElements[0].state = ElementStates.Default;

    await sleep(SHORT_DELAY_IN_MS);
    setListElements([...listElements]);
    setInProgress(false);
    setIsAddingHead(false);
  };

  const handleAddToTailClick = async () => {
    setInProgress(true);
    setIsAddingTail(true);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
    setIsAddingTail(false);
  };

  const handleDeleteClick = async () => {};

  const handleClearClick = async () => {};

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.pageContainer}>
        <div className={styles.controlsContainer}>
          <Input
            placeholder='Введите значение'
            min={1}
            value={inputValue}
            onChange={handleInputValueChange}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
          />
          <Button
            text='Добавить в head'
            onClick={handleAddToHeadClick}
            isLoader={isAddingHead}
            disabled={(inProgress && !isAddingHead) || inputValue.length === 0}
            extraClass={styles.smallButton}
          />
          <Button
            text='Добавить в tail'
            onClick={handleAddToTailClick}
            isLoader={isAddingTail}
            disabled={(inProgress && !isAddingTail) || inputValue.length === 0}
            extraClass={styles.smallButton}
          />
          <Button
            text='Удалить из head'
            onClick={handleAddToHeadClick}
            isLoader={isDeletingHead}
            disabled={!list.isEmpty()}
            extraClass={styles.smallButton}
          />
          <Button
            text='Удалить из tail'
            onClick={handleAddToHeadClick}
            isLoader={isDeletingTail}
            disabled={!list.isEmpty()}
            extraClass={styles.smallButton}
          />
        </div>
        <div className={styles.controlsContainer}>
          <Input
            placeholder='Введите индекс'
            type='number'
            extraClass={styles.input}
            value={inputIndex}
            onChange={handleInputIndexChange}
          />
          <Button
            text='Добавить по индексу'
            extraClass={styles.largeButton}
            onClick={handleAddToHeadClick}
            isLoader={inProgress}
            disabled={inputIndex.length === 0}
          />
          <Button
            text='Удалить по индексу'
            extraClass={styles.largeButton}
            onClick={handleAddToHeadClick}
            isLoader={inProgress}
            disabled={inputIndex.length === 0 || !list.isEmpty()}
          />
        </div>
      </div>
      <ul className={styles.listContainer}>
        {listElements.map((element, index) => (
          <div className={styles.node} key={index}>
            {(isAddingHead || isAddingAtIndex) && element.positionToChange && (
              <Circle
                state={ElementStates.Changing}
                letter={element.valueToChange?.toString()}
                isSmall={true}
                extraClass={styles.addingNode}
              />
            )}
            <Circle
              state={element?.state}
              letter={element?.value.toString()}
              head={element?.isHead ? 'head' : ''}
              tail={element?.isTail ? 'tail' : ''}
              index={index}
              extraClass={'mr-6 ml-6'}
            />
            {element.isLinked && <ArrowIcon />}
          </div>
        ))}
      </ul>
    </SolutionLayout>
  );
};
