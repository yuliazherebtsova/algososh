import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { ArrowIcon } from 'components/ui/icons/arrow-icon';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from 'constants/delays';
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
  const [inputIndex, setInputIndex] = useState<number>(-1);
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
      list.append(element);
    });
    initialList[0].isHead = true;
    initialList[initialList.length - 1].isTail = true;
    initialList[initialList.length - 1].isLinked = false;
    setListElements(initialList);
  }, [initialList, initialListElements, list]);

  const handleInputValueChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleInputIndexChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(parseInt(evt.currentTarget.value));
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
    setInputIndex(-1);
    setInputValue('');
  };

  const handleAddToTailClick = async () => {
    setInProgress(true);
    setIsAddingTail(true);
    await sleep(SHORT_DELAY_IN_MS);
    let tailIndex = list.getSize() - 1;
    if (tailIndex === 0) {
      listElements[tailIndex].isHead = false;
    }
    listElements[tailIndex].isTail = false;
    listElements[tailIndex].positionToChange = true;
    listElements[tailIndex].valueToChange = inputValue;
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[tailIndex].positionToChange = false;
    listElements[tailIndex].isLinked = true;
    listElements[0].isHead = true;
    list.append(inputValue);
    const tail = list.getNodeByIndex(tailIndex);
    listElements.push({
      value: tail ? tail : '',
      state: ElementStates.Modified,
      isTail: true,
      isLinked: false,
    });
    setListElements([...listElements]);
    tailIndex = list.getSize() - 1;
    listElements[tailIndex].state = ElementStates.Default;
    await sleep(SHORT_DELAY_IN_MS);
    setListElements([...listElements]);
    setInProgress(false);
    setIsAddingTail(false);
    setInputIndex(-1);
    setInputValue('');
  };

  const handleDeleteHeadClick = async () => {
    setInProgress(true);
    setIsDeletingHead(true);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[0].positionToChange = true;
    listElements[0].valueToChange = listElements[0].value;
    listElements[0].value = '';
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[0].positionToChange = false;
    list.deleteHead();
    listElements.shift();
    listElements[0].isHead = true;
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
    setIsDeletingHead(false);
    setInputIndex(-1);
    setInputValue('');
  };

  const handleDeleteTailClick = async () => {
    setInProgress(true);
    setIsDeletingTail(true);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[list.getSize() - 1].positionToChange = true;
    listElements[list.getSize() - 1].valueToChange =
      listElements[list.getSize() - 1].value;
    listElements[list.getSize() - 1].value = '';
    listElements[list.getSize() - 1].isTail = false;
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    listElements[list.getSize() - 1].positionToChange = false;
    list.deleteTail();
    listElements.pop();
    listElements[list.getSize() - 1].isTail = true;
    listElements[list.getSize() - 1].isLinked = false;
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
    setIsDeletingTail(false);
    setInputIndex(-1);
    setInputValue('');
  };

  const handleAddAtIndexClick = async () => {
    list.print()
    setInProgress(true);
    setIsAddingAtIndex(true);
    await sleep(SHORT_DELAY_IN_MS);
    list.addByIndex(inputIndex, inputValue);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i].state = ElementStates.Changing;
      listElements[i].positionToChange = true;
      listElements[i].valueToChange = inputValue;
      listElements[i].isHead = false;
      setListElements([...listElements]);
      await sleep(SHORT_DELAY_IN_MS);
      listElements[i].positionToChange = false;
      if (inputIndex !== 0) {
        listElements[0].isHead = true;
      }
      setListElements([...listElements]);
    }
    const insertedNode = list.getNodeByIndex(inputIndex);
    listElements.splice(inputIndex, 0, {
      value: insertedNode ? insertedNode : '',
      state: ElementStates.Modified,
      isLinked: true,
    });
    listElements[0].isHead = true;
    listElements[list.getSize() - 1].isTail = true;
    setListElements([...listElements]);
    for (let i = 0; i <= inputIndex + 1; i++) {
      listElements[i].state = ElementStates.Default;
    }
    await sleep(SHORT_DELAY_IN_MS);
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
    setIsAddingAtIndex(false);
    setInputIndex(-1);
    setInputValue('');
    list.print()
  };

  const handleDeleteAtIndexClick = async () => {
    setInProgress(true);
    setIsDeletingAtIndex(true);
    await sleep(SHORT_DELAY_IN_MS);
    list.deleteByIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i].state = ElementStates.Changing;
      listElements[i].positionToChange = true;
      listElements[i].isTail = false;
      setListElements([...listElements]);
      if (i === inputIndex) {
        await sleep(SHORT_DELAY_IN_MS);
        const tmp = listElements[i].value;
        listElements[i].value = '';
        setListElements([...listElements]);
        listElements[i].valueToChange = tmp;
      }
      setListElements([...listElements]);
      await sleep(SHORT_DELAY_IN_MS);
      listElements[i].positionToChange = false;
      setListElements([...listElements]);
    }
    listElements.splice(inputIndex, 1);
    listElements[0].isHead = true;
    listElements[list.getSize() - 1].isTail = true;
    setListElements([...listElements]);
    for (let i = 0; i < inputIndex; i++) {
      listElements[i].state = ElementStates.Default;
    }
    await sleep(SHORT_DELAY_IN_MS);
    setListElements([...listElements]);
    await sleep(SHORT_DELAY_IN_MS);
    setInProgress(false);
    setIsDeletingAtIndex(false);
    setInputIndex(-1);
    setInputValue('');
  };

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
            disabled={inProgress}
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
            onClick={handleDeleteHeadClick}
            isLoader={isDeletingHead}
            disabled={list.isEmpty() || list.getSize() < 2}
            extraClass={styles.smallButton}
          />
          <Button
            text='Удалить из tail'
            onClick={handleDeleteTailClick}
            isLoader={isDeletingTail}
            disabled={list.isEmpty() || list.getSize() < 2}
            extraClass={styles.smallButton}
          />
        </div>
        <div className={styles.controlsContainer}>
          <Input
            placeholder='Введите индекс'
            type='number'
            extraClass={styles.input}
            value={inputIndex >= 0 ? inputIndex : ''}
            onChange={handleInputIndexChange}
            disabled={inProgress}
          />
          <Button
            text='Добавить по индексу'
            extraClass={styles.largeButton}
            onClick={handleAddAtIndexClick}
            isLoader={isAddingAtIndex}
            disabled={
              inputIndex < 0 ||
              inputIndex > list.getSize() ||
              inputValue.length === 0
            }
          />
          <Button
            text='Удалить по индексу'
            extraClass={styles.largeButton}
            onClick={handleDeleteAtIndexClick}
            isLoader={isDeletingAtIndex}
            disabled={
              inputIndex < 0 || list.isEmpty() || inputIndex >= list.getSize()
            }
          />
        </div>
      </div>
      <ul className={styles.listContainer}>
        {listElements.map((element, index) => (
          <div className={styles.node} key={index}>
            {(isAddingHead || isAddingTail || isAddingAtIndex) &&
              element.positionToChange && (
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
            {(isDeletingHead || isDeletingTail || isDeletingAtIndex) &&
              element.positionToChange && (
                <Circle
                  state={ElementStates.Changing}
                  letter={element.valueToChange?.toString()}
                  isSmall={true}
                  extraClass={styles.deletingNode}
                />
              )}
            {element.isLinked && !element.isTail && (
              <ArrowIcon
                fill={
                  element.state === ElementStates.Changing
                    ? '#d252e1'
                    : '#0032FF'
                }
              />
            )}
          </div>
        ))}
      </ul>
    </SolutionLayout>
  );
};
