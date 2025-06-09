import { LinkedList } from "./01-linked-list";

/**
 * Double-Ended Queue (Deque) implemented with a circular doubly linked list
 */
export class Deque<T> {
  private list: LinkedList<T>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the deque
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<T>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the front of the deque
   * @param item The element to add
   */
  enqueueFront(item: T): void {
    if (this.isFull()) {
      throw new Error("Deque is full");
    }
    this.list.prepend(item);
  }

  /**
   * Add an element to the rear of the deque
   * @param item The element to add
   */
  enqueueRear(item: T): void {
    if (this.isFull()) {
      throw new Error("Deque is full");
    }
    this.list.append(item);
  }

  /**
   * Remove and return the element from the front of the deque
   * @returns The element at the front or undefined if empty
   */
  dequeueFront(): T | undefined {
    return this.list.deleteHead();
  }

  /**
   * Remove and return the element from the rear of the deque
   * @returns The element at the rear or undefined if empty
   */
  dequeueRear(): T | undefined {
    return this.list.deleteTail();
  }

  /**
   * Get the element at the front without removing it
   * @returns The element at the front or undefined if empty
   */
  getFront(): T | undefined {
    return this.list.getHead();
  }

  /**
   * Get the element at the rear without removing it
   * @returns The element at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return this.list.getTail();
  }

  /**
   * Check if the deque is empty
   * @returns True if the deque is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Check if the deque is full
   * @returns True if the deque is full, false otherwise
   */
  isFull(): boolean {
    return this.maxSize !== undefined && this.list.size() >= this.maxSize;
  }

  /**
   * Peek at the front element without removing it
   * @returns The element at the front or undefined if empty
   */
  peek(): T | undefined {
    return this.getFront();
  }

  /**
   * Get the current size of the deque
   * @returns The number of elements in the deque
   */
  size(): number {
    return this.list.size();
  }
}
