export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}

export type TDataElement = {
  char: string,
  state: ElementStates
}