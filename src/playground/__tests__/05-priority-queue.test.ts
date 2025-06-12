import { PriorityQueue } from "../05-priority-queue";

/**
 * Test suite for PriorityQueue
 */
describe("PriorityQueue", () => {
  let queue: PriorityQueue<string>;

  beforeEach(() => {
    queue = new PriorityQueue<string>();
  });

  /**
   * Test isEmpty method
   */
  describe("isEmpty", () => {
    test("should return true for an empty queue", () => {
      expect(queue.isEmpty()).toBe(true);
    });

    test("should return false for a non-empty queue", () => {
      queue.enqueue("Task 1", 1);
      expect(queue.isEmpty()).toBe(false);
    });
  });

  /**
   * Test isFull method
   */
  describe("isFull", () => {
    test("should return false for an unbounded queue", () => {
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 2);
      expect(queue.isFull()).toBe(false);
    });

    test("should return true when a bounded queue reaches maxSize", () => {
      queue = new PriorityQueue<string>(2);
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 2);
      expect(queue.isFull()).toBe(true);
    });

    test("should return false when a bounded queue is not full", () => {
      queue = new PriorityQueue<string>(2);
      queue.enqueue("Task 1", 1);
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
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 2);
      expect(queue.size()).toBe(2);
    });

    test("should return correct size after adding and removing elements", () => {
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 2);
      queue.dequeue();
      expect(queue.size()).toBe(1);
    });
  });

  /**
   * Test enqueue method
   */
  describe("enqueue", () => {
    test("should add element to an empty queue", () => {
      queue.enqueue("Task 1", 1);
      expect(queue.getFront()).toBe("Task 1");
      expect(queue.getRear()).toBe("Task 1");
      expect(queue.size()).toBe(1);
    });

    test("should add elements in correct priority order", () => {
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 3);
      queue.enqueue("Task 3", 2);
      expect(queue.getFront()).toBe("Task 2"); // Priority 3
      expect(queue.getRear()).toBe("Task 1"); // Priority 1
      expect(queue.size()).toBe(3);
      expect(queue.dequeue()).toBe("Task 2");
      expect(queue.getFront()).toBe("Task 3"); // Priority 2
    });

    test("should handle elements with equal priorities", () => {
      queue.enqueue("Task 1", 2);
      queue.enqueue("Task 2", 2);
      expect(queue.getFront()).toBe("Task 1");
      expect(queue.getRear()).toBe("Task 2");
      expect(queue.size()).toBe(2);
    });

    test("should throw error when enqueueing to a full bounded queue", () => {
      queue = new PriorityQueue<string>(1);
      queue.enqueue("Task 1", 1);
      expect(() => queue.enqueue("Task 2", 2)).toThrow(
        "Priority queue is full",
      );
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
      queue.enqueue("Task 1", 1);
      expect(queue.dequeue()).toBe("Task 1");
      expect(queue.isEmpty()).toBe(true);
      expect(queue.getFront()).toBeUndefined();
      expect(queue.getRear()).toBeUndefined();
    });

    test("should remove and return highest priority element", () => {
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 3);
      queue.enqueue("Task 3", 2);
      expect(queue.dequeue()).toBe("Task 2");
      expect(queue.getFront()).toBe("Task 3");
      expect(queue.getRear()).toBe("Task 1");
      expect(queue.size()).toBe(2);
    });
  });

  /**
   * Test getFront method
   */
  describe("getFront", () => {
    test("should return undefined for an empty queue", () => {
      expect(queue.getFront()).toBeUndefined();
    });

    test("should return the highest priority element without removing it", () => {
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 2);
      expect(queue.getFront()).toBe("Task 2");
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

    test("should return the lowest priority element without removing it", () => {
      queue.enqueue("Task 1", 2);
      queue.enqueue("Task 2", 1);
      expect(queue.getRear()).toBe("Task 2");
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

    test("should return the highest priority element without removing it", () => {
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 2);
      expect(queue.peek()).toBe("Task 2");
      expect(queue.size()).toBe(2);
    });
  });

  /**
   * Test integration of multiple operations
   */
  describe("integration", () => {
    test("should handle a sequence of enqueue and dequeue operations", () => {
      queue = new PriorityQueue<string>(3);
      queue.enqueue("Task 1", 1);
      queue.enqueue("Task 2", 3);
      expect(queue.peek()).toBe("Task 2");
      expect(queue.getRear()).toBe("Task 1");
      expect(queue.size()).toBe(2);
      queue.enqueue("Task 3", 2);
      expect(queue.isFull()).toBe(true);
      expect(() => queue.enqueue("Task 4", 4)).toThrow(
        "Priority queue is full",
      );
      expect(queue.dequeue()).toBe("Task 2");
      expect(queue.getFront()).toBe("Task 3");
      expect(queue.size()).toBe(2);
      queue.enqueue("Task 4", 4);
      expect(queue.getFront()).toBe("Task 4");
      expect(queue.getRear()).toBe("Task 1");
      expect(queue.dequeue()).toBe("Task 4");
      expect(queue.dequeue()).toBe("Task 3");
      expect(queue.dequeue()).toBe("Task 1");
      expect(queue.isEmpty()).toBe(true);
    });
  });
});
