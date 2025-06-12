import { CircularQueue } from "../03-circular-queue";

/**
 * Test suite for CircularQueue
 */
describe("CircularQueue", () => {
  let queue: CircularQueue<number>;

  beforeEach(() => {
    queue = new CircularQueue<number>(3);
  });

  /**
   * Test isEmpty method
   */
  describe("isEmpty", () => {
    test("should return true for an empty queue", () => {
      expect(queue.isEmpty()).toBe(true);
    });

    test("should return false for a non-empty queue", () => {
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
    });
  });

  /**
   * Test isFull method
   */
  describe("isFull", () => {
    test("should return true when queue reaches maxSize", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.isFull()).toBe(true);
    });

    test("should return false when queue is not full", () => {
      queue.enqueue(1);
      expect(queue.isFull()).toBe(false);
    });

    test("should return false after dequeuing from a full queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.dequeue();
      expect(queue.isFull()).toBe(false);
    });
  });

  /**
   * Test size method
   */
  describe("size", () => {
    test("should return 0 for an empty queue", () => {
      expect(queue.size()).toBe(0);
    });

    test("should return correct size after adding elements", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.size()).toBe(2);
    });

    test("should return correct size after adding and removing elements", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      expect(queue.size()).toBe(1);
    });
  });

  /**
   * Test enqueue method
   */
  describe("enqueue", () => {
    test("should add element to an empty queue", () => {
      queue.enqueue(1);
      expect(queue.getFront()).toBe(1);
      expect(queue.getRear()).toBe(1);
      expect(queue.size()).toBe(1);
    });

    test("should add multiple elements in correct order", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.getFront()).toBe(1);
      expect(queue.getRear()).toBe(2);
      expect(queue.size()).toBe(2);
    });

    test("should throw error when enqueueing to a full queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(() => queue.enqueue(4)).toThrow("Circular queue is full");
    });
  });

  /**
   * Test dequeue method
   */
  describe("dequeue", () => {
    test("should return undefined for an empty queue", () => {
      expect(queue.dequeue()).toBeUndefined();
      expect(queue.size()).toBe(0);
    });

    test("should remove and return the only element", () => {
      queue.enqueue(1);
      expect(queue.dequeue()).toBe(1);
      expect(queue.isEmpty()).toBe(true);
      expect(queue.getFront()).toBeUndefined();
      expect(queue.getRear()).toBeUndefined();
    });

    test("should remove and return elements in FIFO order", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);
      expect(queue.getFront()).toBe(2);
      expect(queue.getRear()).toBe(2);
      expect(queue.size()).toBe(1);
    });
  });

  /**
   * Test getFront method
   */
  describe("getFront", () => {
    test("should return undefined for an empty queue", () => {
      expect(queue.getFront()).toBeUndefined();
    });

    test("should return the front element without removing it", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.getFront()).toBe(1);
      expect(queue.size()).toBe(2);
    });
  });

  /**
   * Test getRear method
   */
  describe("getRear", () => {
    test("should return undefined for an empty queue", () => {
      expect(queue.getRear()).toBeUndefined();
    });

    test("should return the rear element without removing it", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.getRear()).toBe(2);
      expect(queue.size()).toBe(2);
    });
  });

  /**
   * Test peek method
   */
  describe("peek", () => {
    test("should return undefined for an empty queue", () => {
      expect(queue.peek()).toBeUndefined();
    });

    test("should return the front element without removing it", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.peek()).toBe(1);
      expect(queue.size()).toBe(2);
    });
  });

  /**
   * Test integration of multiple operations
   */
  describe("integration", () => {
    test("should handle a sequence of enqueue and dequeue operations", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.peek()).toBe(1);
      expect(queue.getRear()).toBe(2);
      expect(queue.size()).toBe(2);
      queue.enqueue(3);
      expect(queue.isFull()).toBe(true);
      expect(() => queue.enqueue(4)).toThrow("Circular queue is full");
      expect(queue.dequeue()).toBe(1);
      expect(queue.getFront()).toBe(2);
      expect(queue.size()).toBe(2);
      queue.enqueue(4);
      expect(queue.getRear()).toBe(4);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.isEmpty()).toBe(true);
    });
  });
});
