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

  isEmpty = () => this.length === 0;

  getTailElement() {
    if (!this.isEmpty()) {
      return {
        index: this._tail - 1,
        value: this.container[this._tail - 1],
      };
    }
    return null;
  }

  getHeadElement() {
    if (!this.isEmpty()) {
      return {
        index: this._head,
        value: this.container[this._head],
      };
    }
    return null;
  }

  getSize = () => this.length;

  getElements = () => this.container;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('enqueue: Maximum length exceeded');
    }
    this.container[this._tail % this.size] = item;
    this._tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('dequeue: No elements in the queue');
    }
    this.container[this._head] = null;
    this._head++;
    this.length--;
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('peek: No elements in the queue');
    }
    return this.container[this._head];
  };

  clear = () => {
    this._head = 0;
    this._tail = 0;
    this.length = 0;
  };
}
