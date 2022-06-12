export enum ElementStates {
  Default = 'default',
  Changing = 'changing',
  Modified = 'modified',
}

export enum Direction {
  Ascending = 'ascending',
  Descending = 'descending',
}

export enum SortAlgorithm {
  bubble = 'пузырек',
  selectsort = 'выбор',
}

export type TDataElement = {
  value: string | number;
  state: ElementStates;
  isHead?: boolean;
};
