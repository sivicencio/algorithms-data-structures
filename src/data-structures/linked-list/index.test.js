import LinkedList from '.';

describe('LinkedList', () => {
  describe('#clear', () => {
    describe('when linked list is empty', () => {
      let linkedList;

      beforeAll(() => {
        linkedList = new LinkedList();
        linkedList.clear();
      });

      it('sets head as null', () => {
        expect(linkedList.head).toBeNull();
      });

      it('sets tail as null', () => {
        expect(linkedList.tail).toBeNull();
      });

      it('sets size to 0', () => {
        expect(linkedList.size).toBe(0);
      });
    });

    describe('when linked list is not empty', () => {
      let linkedList;
      let originalSize;

      beforeAll(() => {
        linkedList = new LinkedList();
        linkedList.addFirst('first element');
        linkedList.addFirst('second element');
        originalSize = linkedList.size;
        linkedList.clear();
      });

      it('sets head as null', () => {
        expect(linkedList.head).toBeNull();
      });

      it('sets tail as null', () => {
        expect(linkedList.tail).toBeNull();
      });

      it('sets size to 0', () => {
        expect(linkedList.size).toBe(0);
        expect(linkedList.size).toBeLessThan(originalSize);
      });
    });
  });

  describe('#isEmpty', () => {
    describe('when linked list is empty', () => {
      it('returns true', () => {
        expect(new LinkedList().isEmpty()).toBe(true);
      });
    });

    describe('when linked list is not empty', () => {
      it('returns false', () => {
        const linkedList = new LinkedList();
        linkedList.addFirst('element');
        expect(linkedList.isEmpty()).toBe(false);
      });
    });
  });

  describe('#addFirst', () => {
    let linkedList;
    let originalSize;
    const newElement = { elemKey: 'elemValue' };

    describe('when linked list is empty', () => {
      beforeAll(() => {
        linkedList = new LinkedList();
        originalSize = linkedList.size;
        linkedList.addFirst(newElement);
      });

      it('adds new element at the head of the list', () => {
        expect(linkedList.head.data).toBe(newElement);
      });

      it('sets the previous and next element of the head as null', () => {
        expect(linkedList.head.prev).toBeNull();
        expect(linkedList.head.next).toBeNull();
      });

      it('sets the tail of the list to be the same as the head', () => {
        expect(linkedList.tail).toBe(linkedList.head);
      });

      it('sets the previous and next element of the tail to be the same as the head', () => {
        expect(linkedList.tail.prev).toBeNull();
        expect(linkedList.tail.next).toBeNull();
      });

      it('increases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize + 1);
      });
    });

    describe('when linked list is not empty', () => {
      const oldElement = { elemKey: 'oldElemValue' };
      let oldHead;

      beforeAll(() => {
        linkedList = new LinkedList();
        linkedList.addFirst(oldElement);
        originalSize = linkedList.size;
        oldHead = linkedList.head;
        linkedList.addFirst(newElement);
      });

      it('adds new element at the head of the list', () => {
        expect(linkedList.head.data).toBe(newElement);
      });

      it('sets the previous element of the head as null', () => {
        expect(linkedList.head.prev).toBeNull();
      });

      it('sets the next element of the head as the previous head', () => {
        expect(linkedList.head.next).toBe(oldHead);
      });

      it('sets the previous element of the previous head to be the new head', () => {
        expect(oldHead.prev).toBe(linkedList.head);
      });

      it('increases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize + 1);
      });
    });
  });

  describe('#addLast', () => {
    let linkedList;
    let originalSize;
    const newElement = { elemKey: 'elemValue' };

    describe('when linked list is empty', () => {
      beforeAll(() => {
        linkedList = new LinkedList();
        originalSize = linkedList.size;
        linkedList.addLast(newElement);
      });

      it('adds new element at the tail of the list', () => {
        expect(linkedList.tail.data).toBe(newElement);
      });

      it('sets the previous and next element of the tail as null', () => {
        expect(linkedList.tail.prev).toBeNull();
        expect(linkedList.tail.next).toBeNull();
      });

      it('sets the head of the list to be the same as the tail', () => {
        expect(linkedList.head).toBe(linkedList.tail);
      });

      it('sets the previous and next element of the head to be the same as the tail', () => {
        expect(linkedList.head.prev).toBeNull();
        expect(linkedList.head.next).toBeNull();
      });

      it('increases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize + 1);
      });
    });

    describe('when linked list is not empty', () => {
      const oldElement = { elemKey: 'oldElemValue' };
      let oldTail;

      beforeAll(() => {
        linkedList = new LinkedList();
        linkedList.addLast(oldElement);
        originalSize = linkedList.size;
        oldTail = linkedList.tail;
        linkedList.addLast(newElement);
      });

      it('adds new element at the tail of the list', () => {
        expect(linkedList.tail.data).toBe(newElement);
      });

      it('sets the previous element of the tail as the previous tail', () => {
        expect(linkedList.tail.prev).toBe(oldTail);
      });

      it('sets the next element of the tail as null', () => {
        expect(linkedList.tail.next).toBeNull();
      });

      it('sets the next element of the previous tail to be the new tail', () => {
        expect(oldTail.next).toBe(linkedList.tail);
      });

      it('increases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize + 1);
      });
    });
  });

  describe('#add', () => {
    let linkedList;
    let spyAddLast;
    const newElement = { elemKey: 'elemValue' };

    beforeAll(() => {
      linkedList = new LinkedList();
      spyAddLast = jest.spyOn(linkedList, 'addLast');
      linkedList.addLast(newElement);
    });
    afterAll(() => spyAddLast.mockRestore());

    it('calls addLast method with new element as argument', () => {
      expect(spyAddLast).toHaveBeenCalledWith(newElement);
    });
  });

  describe('#peekFirst', () => {
    let linkedList;

    beforeAll(() => {
      linkedList = new LinkedList();
    });

    describe('when linked list is empty', () => {
      it('throws an error', () => {
        expect(() => linkedList.peekFirst()).toThrow(Error);
      });
    });

    describe('when linked list is not empty', () => {
      const firstElement = { firstKey: 'firstValue' };
      const lastElement = { lastKey: 'lastValue' };

      beforeAll(() => {
        linkedList.add(firstElement);
        linkedList.add(lastElement);
      });

      it('returns the data from the head of the list', () => {
        expect(linkedList.peekFirst()).toBe(firstElement);
      });
    });
  });

  describe('#peekLast', () => {
    let linkedList;

    beforeAll(() => {
      linkedList = new LinkedList();
    });

    describe('when linked list is empty', () => {
      it('throws an error', () => {
        expect(() => linkedList.peekLast()).toThrow(Error);
      });
    });

    describe('when linked list is not empty', () => {
      const firstElement = { firstKey: 'firstValue' };
      const lastElement = { lastKey: 'lastValue' };

      beforeAll(() => {
        linkedList.add(firstElement);
        linkedList.add(lastElement);
      });

      it('returns the data from the tail of the list', () => {
        expect(linkedList.peekLast()).toBe(lastElement);
      });
    });
  });

  describe('#removeFirst', () => {
    let linkedList;
    let originalSize;
    let originalHead;
    let removedData;
    const firstElement = { firstKey: 'firstValue' };
    const lastElement = { lastKey: 'lastValue' };

    beforeAll(() => {
      linkedList = new LinkedList();
    });

    describe('when linked list is empty', () => {
      it('throws an error', () => {
        expect(() => linkedList.removeFirst()).toThrow(Error);
      });
    });

    describe('when linked list contains one element', () => {
      beforeAll(() => {
        linkedList.add(firstElement);
        originalSize = linkedList.size;
        originalHead = linkedList.head;
        removedData = linkedList.removeFirst();
      });

      it('returns the data from the head of the list', () => {
        expect(removedData).toBe(originalHead.data);
        expect(removedData).toBe(firstElement);
      });

      it('sets the new head as null', () => {
        expect(linkedList.head).toBeNull();
      });

      it('sets the tail as null', () => {
        expect(linkedList.tail).toBeNull();
      });

      it('decreases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize - 1);
      });
    });

    describe('when linked list contains more than one element', () => {
      beforeAll(() => {
        linkedList.add(firstElement);
        linkedList.add(lastElement);
        originalSize = linkedList.size;
        originalHead = linkedList.head;
        removedData = linkedList.removeFirst();
      });

      it('returns the data from the head of the list', () => {
        expect(removedData).toBe(originalHead.data);
        expect(removedData).toBe(firstElement);
      });

      it('sets the new head as the second element of the list', () => {
        expect(linkedList.head).toBe(originalHead.next);
      });

      it('sets the previous element of the head as null', () => {
        expect(linkedList.head.prev).toBeNull();
      });

      it('decreases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize - 1);
      });
    });
  });

  describe('#removeLast', () => {
    let linkedList;
    let originalSize;
    let originalTail;
    let removedData;
    const firstElement = { firstKey: 'firstValue' };
    const lastElement = { lastKey: 'lastValue' };

    beforeAll(() => {
      linkedList = new LinkedList();
    });

    describe('when linked list is empty', () => {
      it('throws an error', () => {
        expect(() => linkedList.removeLast()).toThrow(Error);
      });
    });

    describe('when linked list contains one element', () => {
      beforeAll(() => {
        linkedList.add(firstElement);
        originalSize = linkedList.size;
        originalTail = linkedList.tail;
        removedData = linkedList.removeLast();
      });

      it('returns the data from the tail of the list', () => {
        expect(removedData).toBe(originalTail.data);
        expect(removedData).toBe(firstElement);
      });

      it('sets the new tail as null', () => {
        expect(linkedList.tail).toBeNull();
      });

      it('sets the head as null', () => {
        expect(linkedList.head).toBeNull();
      });

      it('decreases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize - 1);
      });
    });

    describe('when linked list contains more than one element', () => {
      beforeAll(() => {
        linkedList.add(firstElement);
        linkedList.add(lastElement);
        originalSize = linkedList.size;
        originalTail = linkedList.tail;
        removedData = linkedList.removeLast();
      });

      it('returns the data from the tail of the list', () => {
        expect(removedData).toBe(originalTail.data);
        expect(removedData).toBe(lastElement);
      });

      it('sets the new tail as the second-last element of the list', () => {
        expect(linkedList.tail).toBe(originalTail.prev);
      });

      it('sets the next element of the tail as null', () => {
        expect(linkedList.tail.next).toBeNull();
      });

      it('decreases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize - 1);
      });
    });
  });

  describe('#removeNode', () => {
    let linkedList;
    let nodeToRemove;
    let removedData;
    const elements = [
      { firstKey: 'firstValue' },
      { secondKey: 'secondValue' },
      { lastKey: 'lastValue' },
    ];

    describe('when node is the head of the list', () => {
      let spyRemoveFirst;

      beforeAll(() => {
        linkedList = new LinkedList();
        elements.forEach((element) => linkedList.add(element));
        nodeToRemove = linkedList.head;
        spyRemoveFirst = jest.spyOn(linkedList, 'removeFirst');
        removedData = linkedList.removeNode(nodeToRemove);
      });
      afterAll(() => spyRemoveFirst.mockRestore());

      it('calls removeFirst method', () => {
        expect(spyRemoveFirst).toHaveBeenCalled();
      });

      it('returns the data from the head of the list', () => {
        expect(removedData).toBe(nodeToRemove.data);
        expect(removedData).toBe(elements[0]);
      });
    });

    describe('when node is the tail of the list', () => {
      let spyRemoveLast;

      beforeAll(() => {
        linkedList = new LinkedList();
        elements.forEach((element) => linkedList.add(element));
        nodeToRemove = linkedList.tail;
        spyRemoveLast = jest.spyOn(linkedList, 'removeLast');
        removedData = linkedList.removeNode(nodeToRemove);
      });
      afterAll(() => spyRemoveLast.mockRestore());

      it('calls removeLast method', () => {
        expect(spyRemoveLast).toHaveBeenCalled();
      });

      it('returns the data from the tail of the list', () => {
        expect(removedData).toBe(nodeToRemove.data);
        expect(removedData).toBe(elements[elements.length - 1]);
      });
    });

    describe('when node is any node but the head or the tail of the list', () => {
      let originalSize;

      beforeAll(() => {
        linkedList = new LinkedList();
        elements.forEach((element) => linkedList.add(element));
        originalSize = linkedList.size;
        nodeToRemove = linkedList.head.next;
        removedData = linkedList.removeNode(nodeToRemove);
      });

      it('returns the data from the specified node', () => {
        expect(removedData).toBe(nodeToRemove.data);
        expect(removedData).toBe(elements[1]);
      });

      it('updates the next node of the previous node to the removed one', () => {
        expect(nodeToRemove.prev.next).toBe(nodeToRemove.next);
      });

      it('updates the previous node of the next node to the removed one', () => {
        expect(nodeToRemove.next.prev).toBe(nodeToRemove.prev);
      });

      it('decreases the size of the list by 1', () => {
        expect(linkedList.size).toBe(originalSize - 1);
      });
    });
  });

  describe('#removeAt', () => {
    let linkedList;
    let nodeToRemove;
    let removedData;
    let spyRemoveNode;
    const elements = [
      { firstKey: 'firstValue' },
      { secondKey: 'secondValue' },
      { lastKey: 'lastValue' },
    ];

    describe('when passing invalid index', () => {
      beforeAll(() => {
        linkedList = new LinkedList();
        elements.forEach((element) => linkedList.add(element));
      });

      describe('when passing negative index', () => {
        it('throws a range error', () => {
          expect(() => linkedList.removeAt(-1)).toThrow(RangeError);
        });
      });

      describe('when passing index greater than the max valid index', () => {
        it('throws a range error', () => {
          expect(() => linkedList.removeAt(elements.length)).toThrow(RangeError);
        });
      });
    });

    describe('when passing valid index', () => {
      elements.forEach((_, index) => {
        describe(`when removing element at index ${index} out of ${elements.length - 1}`, () => {
          beforeAll(() => {
            linkedList = new LinkedList();
            elements.forEach((element, i) => {
              linkedList.add(element);
              if (i === index) nodeToRemove = linkedList.tail;
            });
            spyRemoveNode = jest.spyOn(linkedList, 'removeNode');
            removedData = linkedList.removeAt(index);
          });
          afterAll(() => spyRemoveNode.mockRestore());

          it(`calls removeNode method with node corresponding to index ${index} as argument`, () => {
            expect(spyRemoveNode).toHaveBeenCalledWith(nodeToRemove);
          });

          it(`returns the data from the node corresponding to index ${index}`, () => {
            expect(removedData).toBe(nodeToRemove.data);
            expect(removedData).toBe(elements[index]);
          });
        });
      });
    });
  });

  describe('#remove', () => {
    let linkedList;
    let spyRemoveNode;
    let removed;
    const elements = [
      { firstKey: 'firstValue' },
      null,
    ];
    const otherElement = { otherKey: 'otherValue' };

    describe('when element to remove is not on the list', () => {
      beforeAll(() => {
        linkedList = new LinkedList();
        spyRemoveNode = jest.spyOn(linkedList, 'removeNode');
        elements.forEach((element) => linkedList.add(element));
        removed = linkedList.remove(otherElement);
      });
      afterAll(() => spyRemoveNode.mockRestore());

      it('does not call removeNode', () => {
        expect(spyRemoveNode).not.toHaveBeenCalled();
      });

      it('returns false', () => expect(removed).toBe(false));
    });

    describe('when element to remove is on the list', () => {
      let nodeToRemove;

      elements.forEach((elem, index) => {
        describe(`when removing ${elem === null ? '' : 'non '}null element`, () => {
          beforeAll(() => {
            linkedList = new LinkedList();
            spyRemoveNode = jest.spyOn(linkedList, 'removeNode');
            elements.forEach((element, i) => {
              linkedList.add(element);
              if (i === index) nodeToRemove = linkedList.tail;
            });
            removed = linkedList.remove(elem);
          });
          afterAll(() => spyRemoveNode.mockRestore());

          it('calls removeNode method with node corresponding to element as argument', () => {
            expect(spyRemoveNode).toHaveBeenCalledWith(nodeToRemove);
          });

          it('returns true', () => expect(removed).toBe(true));
        });
      });
    });
  });

  describe('#indexOf', () => {
    let linkedList;
    let indexResult;
    const elements = [
      { firstKey: 'firstValue' },
      { secondKey: 'secondValue' },
    ];
    const otherElement = { otherKey: 'otherValue' };

    describe('when element to look for is not on the list', () => {
      beforeAll(() => {
        linkedList = new LinkedList();
        elements.forEach((element) => linkedList.add(element));
        indexResult = linkedList.indexOf(otherElement);
      });

      it('returns -1', () => expect(indexResult).toBe(-1));
    });

    describe('when element to look for is on the list', () => {
      elements.forEach((elem, index) => {
        describe(`when looking for element at index ${index} out of ${elements.length - 1}`, () => {
          beforeAll(() => {
            linkedList = new LinkedList();
            elements.forEach((element) => linkedList.add(element));
            indexResult = linkedList.indexOf(elem);
          });

          it('returns the corresponding index', () => {
            expect(indexResult).toBe(index);
          });
        });
      });
    });
  });

  describe('#contains', () => {
    let linkedList;
    let containsResult;
    const elements = [
      { firstKey: 'firstValue' },
      { secondKey: 'secondValue' },
    ];
    const otherElement = { otherKey: 'otherValue' };

    describe('when element to look for is not on the list', () => {
      beforeAll(() => {
        linkedList = new LinkedList();
        elements.forEach((element) => linkedList.add(element));
        containsResult = linkedList.contains(otherElement);
      });

      it('returns false', () => expect(containsResult).toBe(false));
    });

    describe('when element to look for is on the list', () => {
      elements.forEach((elem, index) => {
        describe(`when looking for element at index ${index} out of ${elements.length - 1}`, () => {
          beforeAll(() => {
            linkedList = new LinkedList();
            elements.forEach((element) => linkedList.add(element));
            containsResult = linkedList.contains(elem);
          });

          it('returns true', () => expect(containsResult).toBe(true));
        });
      });
    });
  });
});
