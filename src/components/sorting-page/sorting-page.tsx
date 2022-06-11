import { Button } from 'components/ui/button/button';
import { Column } from 'components/ui/column/column';
import { RadioInput } from 'components/ui/radio-input/radio-input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import React, { useState, useEffect } from 'react';
import {
  Direction,
  ElementStates,
  SortAlgorithm,
  TDataElement,
} from 'types/types';
import { getRandomInt, sleep, swap } from 'utils/utils';
import styles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [arrayToSort, setArrayToSort] = React.useState<TDataElement[]>();
  const [sortDirection, setSortDirection] = React.useState<Direction>();
  const [inProgress, setInProgress] = useState(false);
  const [sortAlgorigthm, setSortAlgorithm] = React.useState<SortAlgorithm>();

  useEffect(() => {
    setSortAlgorithm(SortAlgorithm.bubble);
    getRandomArray();
  }, []);

  const getRandomArray = () => {
    const arrLength = getRandomInt(3, 17);
    const randomArray = Array.from({ length: arrLength }, () => ({
      value: getRandomInt(0, 100),
      state: ElementStates.Default,
    }));
    setArrayToSort([...randomArray]);
  };

  const selectionSort = async () => {
    let arr = arrayToSort ? [...arrayToSort] : [];
    if (sortDirection === Direction.Ascending) {
      // по возрастанию
      for (let i = 0; i < arr.length - 1; i++) {
        let indToSwap = i;
        arr[i].state = ElementStates.Changing;
        setArrayToSort([...arr]);
        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setArrayToSort([...arr]);
          if (arr[j].value < arr[indToSwap].value) {
            indToSwap = j;
          }
          await sleep(SHORT_DELAY_IN_MS);
          arr[j].state = ElementStates.Default;
          setArrayToSort([...arr]);
        }
        swap(arr, i, indToSwap);
        arr[i].state = ElementStates.Modified;
        setArrayToSort([...arr]);
      }
      arr[arr.length - 1].state = ElementStates.Modified;
      setArrayToSort([...arr]);
    } else {
      // по убыванию
      for (let i = 0; i < arr.length - 1; i++) {
        let indToSwap = i;
        arr[i].state = ElementStates.Changing;
        setArrayToSort([...arr]);
        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setArrayToSort([...arr]);
          if (arr[j].value > arr[indToSwap].value) {
            indToSwap = j;
          }
          await sleep(SHORT_DELAY_IN_MS);
          arr[j].state = ElementStates.Default;
          setArrayToSort([...arr]);
        }
        swap(arr, i, indToSwap);
        arr[i].state = ElementStates.Modified;
        setArrayToSort([...arr]);
      }
      arr[arr.length - 1].state = ElementStates.Modified;
      setArrayToSort([...arr]);
    }
  };

  const bubbleSort = async () => {
    let arr = arrayToSort ? [...arrayToSort] : [];
    if (sortDirection === Direction.Ascending) {
      // по возрастанию
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].state = ElementStates.Changing;
          arr[j + 1].state = ElementStates.Changing;
          setArrayToSort([...arr]);
          if (arr[j].value > arr[j + 1].value) {
            swap(arr, j, j + 1);
          }
          await sleep(SHORT_DELAY_IN_MS);
          arr[j].state = ElementStates.Default;
          arr[j + 1].state = ElementStates.Default;
          setArrayToSort([...arr]);
        }
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArrayToSort([...arr]);
      }
    } else {
      // по убыванию
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].state = ElementStates.Changing;
          arr[j + 1].state = ElementStates.Changing;
          setArrayToSort([...arr]);
          if (arr[j].value < arr[j + 1].value) {
            swap(arr, j, j + 1);
          }
          await sleep(SHORT_DELAY_IN_MS);
          arr[j].state = ElementStates.Default;
          arr[j + 1].state = ElementStates.Default;
          setArrayToSort([...arr]);
        }
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArrayToSort([...arr]);
      }
    }
  };

  const sortArray = async () => {
    setInProgress(true);
    if (sortAlgorigthm === SortAlgorithm.selectsort) {
      await selectionSort();
    }
    if (sortAlgorigthm === SortAlgorithm.bubble) {
      await bubbleSort();
    }
    setInProgress(false);
  };

  const onAscendingClick = () => {
    setSortDirection(Direction.Ascending);
    sortArray();
  };

  const onDescendingClick = () => {
    setSortDirection(Direction.Descending);
    sortArray();
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.formContainer}>
        <div className={styles.radioButtonsContainer}>
          <RadioInput
            name='radio'
            label='Выбор'
            value='selection'
            onChange={() => setSortAlgorithm(SortAlgorithm.selectsort)}
            checked={sortAlgorigthm === SortAlgorithm.selectsort}
          />
          <RadioInput
            name='radio'
            label='Пузырек'
            value='bubble'
            checked={sortAlgorigthm === SortAlgorithm.bubble}
            onChange={() => setSortAlgorithm(SortAlgorithm.bubble)}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            text='По возрастанию'
            sorting={Direction.Ascending}
            extraClass='mr-12'
            disabled={inProgress}
            isLoader={inProgress && sortDirection === Direction.Ascending}
            onClick={onAscendingClick}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Descending}
            extraClass='mr-40'
            disabled={inProgress}
            isLoader={inProgress && sortDirection === Direction.Descending}
            onClick={onDescendingClick}
          />
          <Button
            disabled={inProgress}
            text='Новый массив'
            onClick={getRandomArray}
          />
        </div>
      </div>
      <div className={styles.barsContainer}>
        {arrayToSort?.map((element, index) => (
          <Column
            index={parseInt(element.value.toString())}
            state={element.state}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
