import { LinkedList } from "./01-linked-list";

/**
 * Simple Queue implemented with a circular doubly linked list
 */
export class SimpleQueue<T> {
  private list: LinkedList<T>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the queue
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<T>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the rear of the queue
   * @param item The element to add
   */
  enqueue(item: T): void {}

  /**
   * Remove and return the element from the front of the queue
   * @returns The element at the front or undefined if empty
   */
  dequeue(): T | undefined {
    return undefined;
  }

  /**
   * Get the element at the front without removing it
   * @returns The element at the front or undefined if empty
   */
  getFront(): T | undefined {
    return undefined;
  }

  /**
   * Get the element at the rear without removing it
   * @returns The element at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return undefined;
  }

  /**
   * Check if the queue is empty
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return false;
  }

  /**
   * Check if the queue is full
   * @returns True if the queue is full, false otherwise
   */
  isFull(): boolean {
    return false;
  }

  /**
   * Peek at the front element without removing it
   * @returns The element at the front or undefined if empty
   */
  peek(): T | undefined {
    return undefined;
  }

  /**
   * Get the current size of the queue
   * @returns The number of elements in the queue
   */
  size(): number {
    return this.list.size();
  }
}
