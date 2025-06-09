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
 * Circular Doubly Linked List
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
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.head!.prev = newNode;
      this.tail!.next = newNode;
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
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.head!.prev = newNode;
      this.tail = newNode;
    }
    this.currentSize++;
  }

  /**
   * Remove and return the value from the front of the list
   * @returns The value at the head or undefined if empty
   */
  deleteHead(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.head!.value;
    if (this.currentSize === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = this.tail;
      this.tail!.next = this.head;
    }
    this.currentSize--;
    return value;
  }

  /**
   * Remove and return the value from the back of the list
   * @returns The value at the tail or undefined if empty
   */
  deleteTail(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.tail!.value;
    if (this.currentSize === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = this.head;
      this.head!.prev = this.tail;
    }
    this.currentSize--;
    return value;
  }

  /**
   * Get the value at the front without removing it
   * @returns The value at the head or undefined if empty
   */
  getHead(): T | undefined {
    return this.head?.value;
  }

  /**
   * Get the value at the back without removing it
   * @returns The value at the tail or undefined if empty
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
