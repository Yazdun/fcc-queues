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
  enqueue(value: T, priority: number): void {
    if (this.isFull()) {
      throw new Error("Priority queue is full");
    }

    const newItem: PriorityItem<T> = { value, priority };
    if (this.isEmpty()) {
      this.list.prepend(newItem);
      return;
    }

    let current = this.list["head"];
    let count = 0;
    while (
      current &&
      current.value.priority >= priority &&
      count < this.size()
    ) {
      current = current.next;
      count++;
    }

    if (count === this.size()) {
      this.list.append(newItem);
    } else {
      const newNode = new NodeItem(newItem);
      newNode.next = current;
      newNode.prev = current!.prev;
      if (current!.prev) {
        current!.prev.next = newNode;
      } else {
        this.list["head"] = newNode;
      }
      current!.prev = newNode;
      if (current === this.list["head"]) {
        this.list["head"] = newNode;
      }
      this.list["tail"]!.next = this.list["head"];
      this.list["head"]!.prev = this.list["tail"];
      this.list["currentSize"]++;
    }
  }

  /**
   * Remove and return the element with the highest priority from the queue
   * @returns The value with the highest priority or undefined if empty
   */
  dequeue(): T | undefined {
    return this.list.deleteHead()?.value;
  }

  /**
   * Get the element with the highest priority without removing it
   * @returns The value at the front or undefined if empty
   */
  getFront(): T | undefined {
    return this.list.getHead()?.value;
  }

  /**
   * Get the element with the lowest priority without removing it
   * @returns The value at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return this.list.getTail()?.value;
  }

  /**
   * Check if the queue is empty
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Check if the queue is full
   * @returns True if the queue is full, false otherwise
   */
  isFull(): boolean {
    return this.maxSize !== undefined && this.list.size() >= this.maxSize;
  }

  /**
   * Peek at the element with the highest priority without removing it
   * @returns The value at the front or undefined if empty
   */
  peek(): T | undefined {
    return this.getFront();
  }

  /**
   * Get the current size of the queue
   * @returns The number of elements in the queue
   */
  size(): number {
    return this.list.size();
  }
}
