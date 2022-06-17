import { TDataElement } from 'types/types';

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: (T | null)[] = [];

  getSize = () => this.container.length;

  getElements = () => this.container;

  isEmpty = () => this.container.length === 0;

  push = (item: T) => this.container.push(item);

  pop = () => {
    if (this.container.length > 0) {
      return this.container.pop();
    }
  };

  peek = () => this.container[this.container.length - 1];

  clear = () => (this.container = []);
}

export const stack = new Stack<TDataElement>();
