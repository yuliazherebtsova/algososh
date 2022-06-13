import { Button } from 'components/ui/button/button';
import { Circle } from 'components/ui/circle/circle';
import { Input } from 'components/ui/input/input';
import { SolutionLayout } from 'components/ui/solution-layout/solution-layout';
import React, { FC, useState } from 'react';
import { TDataElement } from 'types/types';
import styles from './list-page.module.css';

export const ListPage: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<number>();
  const [listElements, setListElements] = useState<TDataElement[]>([]);

  const handleInputValueChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleInputIndexChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const input = parseInt(evt.currentTarget.value);
    setInputIndex(input);
  };

  const handleAddClick = async () => {};

  const handleDeleteClick = async () => {};

  const handleClearClick = async () => {};

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.pageContainer}>
        <div className={styles.controlsContainer}>
          <Input
            extraClass={styles.input}
            placeholder='Введите значение'
            min={1}
            value={inputValue || ''}
            onChange={handleInputValueChange}
            isLimitText={true}
            maxLength={4}
          />
            <Button extraClass={styles.smallButton} text='Добавить в head' />
            <Button extraClass={styles.smallButton} text='Добавить в tail' />
            <Button extraClass={styles.smallButton} text='Удалить из head' />
            <Button extraClass={styles.smallButton} text='Удалить из tail' />
        </div>
        <div className={styles.controlsContainer}>
          <Input
            type='text'
            extraClass={styles.input}
            placeholder='Введите индекс'
            maxLength={1}
            value={inputIndex || ''}
            onChange={handleInputIndexChange}
          />
          <Button extraClass={styles.largeButton} text='Добавить по индексу' />
          <Button extraClass={styles.largeButton} text='Удалить по индексу' />
        </div>
      </div>
      <ul className={styles.listContainer}>
        {listElements.map((element, index) => (
          <Circle />
        ))}
      </ul>
    </SolutionLayout>
  );
};
