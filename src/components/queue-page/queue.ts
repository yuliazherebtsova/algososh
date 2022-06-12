interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private _head = 0;
  private _tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  get tail() {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    } else {
      return this.container[this._tail];
    }
  }

  get head() {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    } else {
      return this.container[this._head];
    }
  }

  isEmpty = () => this.length === 0;

  getSize = () => this.length;

  getElements = () => this.container;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }
    this.container[this._tail % this.size] = item;
    this._tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    this.container[this._head] = null;
    this._head++;
    this.length--;
  };

  peek = (): T | null => {
    if (!this.isEmpty()) {
      return this.container[this._head];
    }
    return null;
  };

  clear = () => {
    this._head = 0;
    this._tail = 0;
    this.length = 0;
    this.container = [];
  };
}
