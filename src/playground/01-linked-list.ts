/**
 * Node for doubly linked list
 */
export class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null = null;
  prev: NodeItem<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Doubly Linked List
 */
export class LinkedList<T> {
  private head: NodeItem<T> | null = null;
  private tail: NodeItem<T> | null = null;
  private currentSize: number = 0;

  /**
   * Add a new node to the front of the list
   * @param value The value to add
   */
  prepend(value: T): void {
    const newNode = new NodeItem(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head!.prev = newNode;
      this.head = newNode;
    }
    this.currentSize++;
  }

  /**
   * Add a new node to the back of the list
   * @param value The value to add
   */
  append(value: T): void {
    const newNode = new NodeItem(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.currentSize++;
  }

  /**
   * Remove and return the value from the front of the list
   * @returns The value at the front or undefined if empty
   */
  deleteHead(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.head!.value;
    this.head = this.head!.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.currentSize--;
    return value;
  }

  /**
   * Remove and return the value from the back of the list
   * @returns The value at the back or undefined if empty
   */
  deleteTail(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.tail!.value;
    this.tail = this.tail!.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.currentSize--;
    return value;
  }

  /**
   * Get the value at the front without removing it
   * @returns The value at the front or undefined if empty
   */
  getHead(): T | undefined {
    return this.head?.value;
  }

  /**
   * Get the value at the back without removing it
   * @returns The value at the back or undefined if empty
   */
  getTail(): T | undefined {
    return this.tail?.value;
  }

  /**
   * Check if the list is empty
   * @returns True if the list is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.currentSize === 0;
  }

  /**
   * Get the current size of the list
   * @returns The number of nodes in the list
   */
  size(): number {
    return this.currentSize;
  }
}
