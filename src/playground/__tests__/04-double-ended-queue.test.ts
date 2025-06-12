import { Deque } from "../04-double-ended-queue";

/**
 * Test suite for Deque
 */
describe("Deque", () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  /**
   * Test isEmpty method
   */
  describe("isEmpty", () => {
    test("should return true for an empty deque", () => {
      expect(deque.isEmpty()).toBe(true);
    });

    test("should return false for a non-empty deque", () => {
      deque.enqueueFront(1);
      expect(deque.isEmpty()).toBe(false);
    });
  });

  /**
   * Test isFull method
   */
  describe("isFull", () => {
    test("should return false for an unbounded deque", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.isFull()).toBe(false);
    });

    test("should return true when a bounded deque reaches maxSize", () => {
      deque = new Deque<number>(2);
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.isFull()).toBe(true);
    });

    test("should return false when a bounded deque is not full", () => {
      deque = new Deque<number>(2);
      deque.enqueueFront(1);
      expect(deque.isFull()).toBe(false);
    });
  });

  /**
   * Test size method
   */
  describe("size", () => {
    test("should return 0 for an empty deque", () => {
      expect(deque.size()).toBe(0);
    });

    test("should return correct size after adding elements", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.size()).toBe(2);
    });

    test("should return correct size after adding and removing elements", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      deque.dequeueFront();
      expect(deque.size()).toBe(1);
    });
  });

  /**
   * Test enqueueFront method
   */
  describe("enqueueFront", () => {
    test("should add element to an empty deque", () => {
      deque.enqueueFront(1);
      expect(deque.getFront()).toBe(1);
      expect(deque.getRear()).toBe(1);
      expect(deque.size()).toBe(1);
    });

    test("should add multiple elements to the front correctly", () => {
      deque.enqueueFront(2);
      deque.enqueueFront(1);
      expect(deque.getFront()).toBe(1);
      expect(deque.getRear()).toBe(2);
      expect(deque.size()).toBe(2);
    });

    test("should throw error when enqueueing to a full bounded deque", () => {
      deque = new Deque<number>(1);
      deque.enqueueFront(1);
      expect(() => deque.enqueueFront(2)).toThrow("Deque is full");
    });
  });

  /**
   * Test enqueueRear method
   */
  describe("enqueueRear", () => {
    test("should add element to an empty deque", () => {
      deque.enqueueRear(1);
      expect(deque.getFront()).toBe(1);
      expect(deque.getRear()).toBe(1);
      expect(deque.size()).toBe(1);
    });

    test("should add multiple elements to the rear correctly", () => {
      deque.enqueueRear(1);
      deque.enqueueRear(2);
      expect(deque.getFront()).toBe(1);
      expect(deque.getRear()).toBe(2);
      expect(deque.size()).toBe(2);
    });

    test("should throw error when enqueueing to a full bounded deque", () => {
      deque = new Deque<number>(1);
      deque.enqueueRear(1);
      expect(() => deque.enqueueRear(2)).toThrow("Deque is full");
    });
  });

  /**
   * Test dequeueFront method
   */
  describe("dequeueFront", () => {
    test("should return undefined for an empty deque", () => {
      expect(deque.dequeueFront()).toBeUndefined();
      expect(deque.size()).toBe(0);
    });

    test("should remove and return the only element", () => {
      deque.enqueueFront(1);
      expect(deque.dequeueFront()).toBe(1);
      expect(deque.isEmpty()).toBe(true);
      expect(deque.getFront()).toBeUndefined();
      expect(deque.getRear()).toBeUndefined();
    });

    test("should remove and return the front element correctly", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.dequeueFront()).toBe(1);
      expect(deque.getFront()).toBe(2);
      expect(deque.getRear()).toBe(2);
      expect(deque.size()).toBe(1);
    });
  });

  /**
   * Test dequeueRear method
   */
  describe("dequeueRear", () => {
    test("should return undefined for an empty deque", () => {
      expect(deque.dequeueRear()).toBeUndefined();
      expect(deque.size()).toBe(0);
    });

    test("should remove and return the only element", () => {
      deque.enqueueRear(1);
      expect(deque.dequeueRear()).toBe(1);
      expect(deque.isEmpty()).toBe(true);
      expect(deque.getFront()).toBeUndefined();
      expect(deque.getRear()).toBeUndefined();
    });

    test("should remove and return the rear element correctly", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.dequeueRear()).toBe(2);
      expect(deque.getFront()).toBe(1);
      expect(deque.getRear()).toBe(1);
      expect(deque.size()).toBe(1);
    });
  });

  /**
   * Test getFront method
   */
  describe("getFront", () => {
    test("should return undefined for an empty deque", () => {
      expect(deque.getFront()).toBeUndefined();
    });

    test("should return the front element without removing it", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.getFront()).toBe(1);
      expect(deque.size()).toBe(2);
    });
  });

  /**
   * Test getRear method
   */
  describe("getRear", () => {
    test("should return undefined for an empty deque", () => {
      expect(deque.getRear()).toBeUndefined();
    });

    test("should return the rear element without removing it", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.getRear()).toBe(2);
      expect(deque.size()).toBe(2);
    });
  });

  /**
   * Test peek method
   */
  describe("peek", () => {
    test("should return undefined for an empty deque", () => {
      expect(deque.peek()).toBeUndefined();
    });

    test("should return the front element without removing it", () => {
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.peek()).toBe(1);
      expect(deque.size()).toBe(2);
    });
  });

  /**
   * Test integration of multiple operations
   */
  describe("integration", () => {
    test("should handle a sequence of mixed operations", () => {
      deque = new Deque<number>(3);
      deque.enqueueFront(1);
      deque.enqueueRear(2);
      expect(deque.peek()).toBe(1);
      expect(deque.getRear()).toBe(2);
      expect(deque.size()).toBe(2);
      deque.enqueueFront(0);
      expect(deque.isFull()).toBe(true);
      expect(() => deque.enqueueRear(3)).toThrow("Deque is full");
      expect(deque.dequeueRear()).toBe(2);
      expect(deque.getFront()).toBe(0);
      expect(deque.getRear()).toBe(1);
      expect(deque.size()).toBe(2);
      deque.enqueueRear(3);
      expect(deque.getRear()).toBe(3);
      expect(deque.dequeueFront()).toBe(0);
      expect(deque.dequeueFront()).toBe(1);
      expect(deque.dequeueRear()).toBe(3);
      expect(deque.isEmpty()).toBe(true);
    });
  });
});
