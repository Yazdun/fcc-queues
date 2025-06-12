import { LinkedList } from "../01-linked-list";

/**
 * Test suite for CircularDoublyLinkedList
 */
describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  /**
   * Test isEmpty method
   */
  describe("isEmpty", () => {
    test("should return true for an empty list", () => {
      expect(list.isEmpty()).toBe(true);
    });

    test("should return false for a non-empty list", () => {
      list.append(1);
      expect(list.isEmpty()).toBe(false);
    });
  });

  /**
   * Test size method
   */
  describe("size", () => {
    test("should return 0 for an empty list", () => {
      expect(list.size()).toBe(0);
    });

    test("should return correct size after adding elements", () => {
      list.append(1);
      list.append(2);
      expect(list.size()).toBe(2);
    });
  });

  /**
   * Test prepend method
   */
  describe("prepend", () => {
    test("should add first element correctly", () => {
      list.prepend(1);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(1);
      expect(list.size()).toBe(1);
      expect(list["head"]!.next).toBe(list["head"]);
      expect(list["head"]!.prev).toBe(list["head"]);
    });

    test("should add multiple elements correctly", () => {
      list.prepend(2);
      list.prepend(1);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(2);
      expect(list.size()).toBe(2);
      expect(list["head"]!.next!.value).toBe(2);
      expect(list["tail"]!.prev!.value).toBe(1);
      expect(list["tail"]!.next).toBe(list["head"]);
      expect(list["head"]!.prev).toBe(list["tail"]);
    });
  });

  /**
   * Test append method
   */
  describe("append", () => {
    test("should add first element correctly", () => {
      list.append(1);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(1);
      expect(list.size()).toBe(1);
      expect(list["head"]!.next).toBe(list["head"]);
      expect(list["head"]!.prev).toBe(list["head"]);
    });

    test("should add multiple elements correctly", () => {
      list.append(1);
      list.append(2);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(2);
      expect(list.size()).toBe(2);
      expect(list["head"]!.next!.value).toBe(2);
      expect(list["tail"]!.prev!.value).toBe(1);
      expect(list["tail"]!.next).toBe(list["head"]);
      expect(list["head"]!.prev).toBe(list["tail"]);
    });
  });

  /**
   * Test deleteHead method
   */
  describe("deleteHead", () => {
    test("should return undefined for an empty list", () => {
      expect(list.deleteHead()).toBeUndefined();
      expect(list.size()).toBe(0);
    });

    test("should delete the only element correctly", () => {
      list.append(1);
      expect(list.deleteHead()).toBe(1);
      expect(list.isEmpty()).toBe(true);
      expect(list.getHead()).toBeUndefined();
      expect(list.getTail()).toBeUndefined();
    });

    test("should delete head from multiple elements correctly", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.deleteHead()).toBe(1);
      expect(list.getHead()).toBe(2);
      expect(list.getTail()).toBe(3);
      expect(list.size()).toBe(2);
      expect(list["head"]!.prev).toBe(list["tail"]);
      expect(list["tail"]!.next).toBe(list["head"]);
    });
  });

  /**
   * Test deleteTail method
   */
  describe("deleteTail", () => {
    test("should return undefined for an empty list", () => {
      expect(list.deleteTail()).toBeUndefined();
      expect(list.size()).toBe(0);
    });

    test("should delete the only element correctly", () => {
      list.append(1);
      expect(list.deleteTail()).toBe(1);
      expect(list.isEmpty()).toBe(true);
      expect(list.getHead()).toBeUndefined();
      expect(list.getTail()).toBeUndefined();
    });

    test("should delete tail from multiple elements correctly", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.deleteTail()).toBe(3);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(2);
      expect(list.size()).toBe(2);
      expect(list["head"]!.prev).toBe(list["tail"]);
      expect(list["tail"]!.next).toBe(list["head"]);
    });
  });

  /**
   * Test getHead method
   */
  describe("getHead", () => {
    test("should return undefined for an empty list", () => {
      expect(list.getHead()).toBeUndefined();
    });

    test("should return the head value correctly", () => {
      list.append(1);
      list.append(2);
      expect(list.getHead()).toBe(1);
    });
  });

  /**
   * Test getTail method
   */
  describe("getTail", () => {
    test("should return undefined for an empty list", () => {
      expect(list.getTail()).toBeUndefined();
    });

    test("should return the tail value correctly", () => {
      list.append(1);
      list.append(2);
      expect(list.getTail()).toBe(2);
    });
  });

  /**
   * Test circularity maintenance
   */
  describe("circularity", () => {
    test("should maintain circular links after multiple operations", () => {
      list.append(1);
      list.append(2);
      list.prepend(0);
      list.deleteHead();
      list.deleteTail();
      list.append(3);
      expect(list.size()).toBe(2);
      expect(list.getHead()).toBe(1);
      expect(list.getTail()).toBe(3);
      expect(list["head"]!.prev).toBe(list["tail"]);
      expect(list["tail"]!.next).toBe(list["head"]);
    });
  });
});
