import { LinkedList, NodeItem } from "./01-linked-list";

/**
 * Interface for an element with priority
 */
interface PriorityItem<T> {
  value: T;
  priority: number;
}

/**
 * Priority Queue implemented with a circular doubly linked list
 */
export class PriorityQueue<T> {
  private list: LinkedList<PriorityItem<T>>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the priority queue
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<PriorityItem<T>>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the queue based on its priority
   * Higher priority numbers are dequeued first
   * @param value The value to add
   * @param priority The priority of the value (higher number = higher priority)
   */
  enqueue(value: T, priority: number): void {}

  /**
   * Remove and return the element with the highest priority from the queue
   * @returns The value with the highest priority or undefined if empty
   */
  dequeue(): T | undefined {
    return undefined;
  }

  /**
   * Get the element with the highest priority without removing it
   * @returns The value at the front or undefined if empty
   */
  getFront(): T | undefined {
    return undefined;
  }

  /**
   * Get the element with the lowest priority without removing it
   * @returns The value at the rear or undefined if empty
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
   * Peek at the element with the highest priority without removing it
   * @returns The value at the front or undefined if empty
   */
  peek(): T | undefined {
    return undefined;
  }

  /**
   * Get the current size of the queue
   * @returns The number of elements in the queue
   */
  size(): number {
    return 0;
  }
}
