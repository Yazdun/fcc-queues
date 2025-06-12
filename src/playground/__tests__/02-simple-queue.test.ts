import { SimpleQueue } from "../02-simple-queue";

/**
 * Test suite for SimpleQueue
 */
describe("SimpleQueue", () => {
  let queue: SimpleQueue<number>;

  beforeEach(() => {
    queue = new SimpleQueue<number>();
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
    test("should return false for an unbounded queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.isFull()).toBe(false);
    });

    test("should return true when a bounded queue reaches maxSize", () => {
      queue = new SimpleQueue<number>(2);
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.isFull()).toBe(true);
    });

    test("should return false when a bounded queue is not full", () => {
      queue = new SimpleQueue<number>(2);
      queue.enqueue(1);
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

    test("should throw error when enqueueing to a full bounded queue", () => {
      queue = new SimpleQueue<number>(1);
      queue.enqueue(1);
      expect(() => queue.enqueue(2)).toThrow("Queue is full");
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
      queue = new SimpleQueue<number>(3);
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.peek()).toBe(1);
      expect(queue.getRear()).toBe(2);
      expect(queue.size()).toBe(2);
      queue.enqueue(3);
      expect(queue.isFull()).toBe(true);
      expect(() => queue.enqueue(4)).toThrow("Queue is full");
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
