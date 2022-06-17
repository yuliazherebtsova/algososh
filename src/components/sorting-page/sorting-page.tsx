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
import { getRandomInt, updateElementsWithInterval } from 'utils/utils';
import styles from './sorting-page.module.css';
import { getSelectionSortSteps } from './utils';

export const SortingPage: React.FC = () => {
  const [arrayToSort, setArrayToSort] = useState<(TDataElement | null)[]>([]);
  const [isAscending, setIsAscending] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [sortAlgorigthm, setSortAlgorithm] = useState<SortAlgorithm | null>(
    null,
  );
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSortAlgorithm(SortAlgorithm.selectsort);
    getRandomArray();
    return () => {
      setIsMounted(false);
    };
  }, []);

  const getRandomArray = () => {
    const minLen = 3;
    const maxLen = 17;
    const minValue = 0;
    const maxValue = 100;
    const arrLength = getRandomInt(minLen, maxLen);
    const randomArray = Array.from({ length: arrLength }, () => ({
      value: getRandomInt(minValue, maxValue),
      state: ElementStates.Default,
    }));
    setArrayToSort([...randomArray]);
  };

  const selectionSort = async (isAscending: boolean) => {
    const steps = getSelectionSortSteps(
      arrayToSort ? [...arrayToSort] : [],
      isAscending,
    );
    let currentStep = 0;
    while (currentStep < steps.length) {
      if (steps) {
        await updateElementsWithInterval(
          setArrayToSort,
          [...steps[currentStep]],
          SHORT_DELAY_IN_MS,
          isComponentMounted,
        );
        currentStep++;
      }
    }
  };

  const bubbleSort = async (isAscending: boolean) => {
    // let arr = arrayToSort ? [...arrayToSort] : [];
    // if (isAscending) {
    //   // по возрастанию
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = 0; j < arr.length - i - 1; j++) {
    //       arr[j]!.state = ElementStates.Changing;
    //       arr[j + 1]!.state = ElementStates.Changing;
    //       setArrayToSort([...arr]);
    //       if (arr[j]!.value > arr[j + 1]!.value) {
    //         swap(arr, j, j + 1);
    //       }
    //       await updateElementsWithInterval(
    //         setArrayToSort,
    //         arr,
    //         SHORT_DELAY_IN_MS,
    //         isComponentMounted,
    //       );
    //       arr[j]!.state = ElementStates.Default;
    //       arr[j + 1]!.state = ElementStates.Default;
    //     }
    //     arr[arr.length - i - 1]!.state = ElementStates.Modified;
    //     setArrayToSort([...arr]);
    //   }
    // } else {
    //   // по убыванию
    //   for (let i = 0; i < arr.length; i++) {
    //     for (let j = 0; j < arr.length - i - 1; j++) {
    //       arr[j]!.state = ElementStates.Changing;
    //       arr[j + 1]!.state = ElementStates.Changing;
    //       setArrayToSort([...arr]);
    //       if (arr[j]!.value < arr[j + 1]!.value) {
    //         swap(arr, j, j + 1);
    //       }
    //       await updateElementsWithInterval(
    //         setArrayToSort,
    //         arr,
    //         SHORT_DELAY_IN_MS,
    //         isComponentMounted,
    //       );
    //       arr[j]!.state = ElementStates.Default;
    //       arr[j + 1]!.state = ElementStates.Default;
    //     }
    //     arr[arr.length - i - 1]!.state = ElementStates.Modified;
    //     setArrayToSort([...arr]);
    //   }
    // }
  };

  const sortArray = async (isAscending: boolean) => {
    setInProgress(true);
    if (sortAlgorigthm === SortAlgorithm.selectsort) {
      await selectionSort(isAscending);
    }
    if (sortAlgorigthm === SortAlgorithm.bubble) {
      await bubbleSort(isAscending);
    }
    setInProgress(false);
  };

  const onSortClick = async (direction: Direction) => {
    setInProgress(true);
    setIsAscending(direction === Direction.Ascending);
    setIsAscending((state) => {
      sortArray(state);
      return state;
    });
    setInProgress(false);
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.pageContainer}>
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
            extraClass={`mr-12 ${styles.largeButton}`}
            disabled={inProgress}
            isLoader={inProgress && isAscending}
            onClick={() => onSortClick(Direction.Ascending)}
          />
          <Button
            text='По убыванию'
            sorting={Direction.Descending}
            extraClass={`mr-40 ${styles.largeButton}`}
            disabled={inProgress}
            isLoader={inProgress && !isAscending}
            onClick={() => onSortClick(Direction.Descending)}
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
            index={parseInt(element!.value.toString())}
            state={element?.state}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
