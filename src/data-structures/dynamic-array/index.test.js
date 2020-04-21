import DynamicArray from '.';

describe('DynamicArray', () => {
  describe('constructor', () => {
    describe('when passing no argument', () => {
      it('initializes a dynamic array object with capacity of 10', () => {
        expect(new DynamicArray().capacity).toBe(10);
      });
    });

    describe('when passing invalid argument', () => {
      describe('when passing something not parsable as a number', () => {
        it('throws a range error', () => {
          expect(() => new DynamicArray('some string')).toThrow(RangeError);
        });
      });

      describe('when passing a negative number', () => {
        it('throws a range error', () => {
          expect(() => new DynamicArray(-1)).toThrow(RangeError);
        });
      });
    });

    describe('when passing valid argument', () => {
      const CAPACITY = 20;

      describe('when passing a non negative number', () => {
        it('initializes a dynamic array object with the passed capacity', () => {
          expect(new DynamicArray(CAPACITY).capacity).toBe(CAPACITY);
        });
      });

      describe('when passing a string corresponding to a non negative number', () => {
        it('initializes a dynamic array object with the passed capacity', () => {
          expect(new DynamicArray(CAPACITY.toString()).capacity).toBe(CAPACITY);
        });
      });
    });
  });

  describe('methods', () => {
    let dynamicArray;

    beforeAll(() => {
      dynamicArray = new DynamicArray();
    });

    describe('#length', () => {
      describe('when array has no elements', () => {
        it('returns 0', () => expect(dynamicArray).toHaveLength(0));
      });

      describe('when array has elements', () => {
        const elemNumber = 10;

        beforeAll(() => {
          for (let i = 0; i < elemNumber; i += 1) {
            dynamicArray.add('element');
          }
        });

        afterAll(() => dynamicArray.clear());

        it('returns the number of elements', () => {
          expect(dynamicArray).toHaveLength(elemNumber);
        });
      });
    });

    describe('#isEmpty', () => {
      describe('when array has no elements', () => {
        it('returns true', () => expect(dynamicArray.isEmpty()).toBe(true));
      });

      describe('when array has elements', () => {
        beforeAll(() => dynamicArray.add('element'));
        afterAll(() => dynamicArray.clear());

        it('returns false', () => expect(dynamicArray.isEmpty()).toBe(false));
      });
    });

    describe('#get', () => {
      describe('when passing a non existent index', () => {
        it('returns undefined', () => expect(dynamicArray.get(0)).toBeUndefined());
      });

      describe('when passing an existent index', () => {
        const elem = 'element';

        beforeAll(() => dynamicArray.add(elem));
        afterAll(() => dynamicArray.clear());

        it('returns the element', () => expect(dynamicArray.get(0)).toBe(elem));
      });
    });

    describe('#set', () => {
      describe('when calling it with non existent index', () => {
        it('throws an error', () => {
          expect(() => dynamicArray.set(0, 'element')).toThrow(Error);
        });
      });

      describe('when calling it with existent index', () => {
        beforeAll(() => dynamicArray.add('element'));
        afterAll(() => dynamicArray.clear());

        it('replaces the element at the specified index with a new element', () => {
          const otherElem = 'other element';
          dynamicArray.set(0, otherElem);
          expect(dynamicArray.get(0)).toBe(otherElem);
        });
      });
    });

    describe('#clear', () => {
      beforeAll(() => {
        dynamicArray.add('element');
        dynamicArray.clear();
      });

      it('clears the elements', () => expect(dynamicArray.get(0)).toBeUndefined());

      it('leaves the array with length of 0', () => {
        expect(dynamicArray).toHaveLength(0);
      });
    });

    describe('#add', () => {
      const elem = 'element';
      let arrayLength;

      beforeAll(() => {
        arrayLength = dynamicArray.length;
        dynamicArray.add(elem);
      });
      afterAll(() => dynamicArray.clear());

      it('adds an element at the end of the array', () => {
        expect(dynamicArray.get(arrayLength)).toBe(elem);
      });

      it('increases the length of the array by 1', () => {
        expect(dynamicArray).toHaveLength(arrayLength + 1);
      });
    });

    describe('#removeAt', () => {
      const elem = 'one element';
      const indexToRemove = 5;
      let arrayLength;

      beforeAll(() => {
        for (let i = 0; i < 5; i += 1) {
          dynamicArray.add('element');
        }
        dynamicArray.add(elem);
        for (let i = 0; i < 5; i += 1) {
          dynamicArray.add('element');
        }
        arrayLength = dynamicArray.length;
      });
      afterAll(() => dynamicArray.clear());

      describe('when passing invalid index', () => {
        describe('when passing negative index', () => {
          it('throws a range error', () => {
            expect(() => dynamicArray.removeAt(-1)).toThrow(RangeError);
          });
        });

        describe('when passing index greater than the max valid index', () => {
          it('throws a range error', () => {
            expect(() => dynamicArray.removeAt(arrayLength)).toThrow(RangeError);
          });
        });
      });

      describe('when passing valid index', () => {
        let removedElem;

        beforeAll(() => {
          removedElem = dynamicArray.removeAt(indexToRemove);
        });

        it('returns the removed element', () => expect(removedElem).toBe(elem));

        it('removes the element from the array', () => {
          expect(dynamicArray.get(indexToRemove)).not.toBe(elem);
        });

        it('decreases the length of the array by 1', () => {
          expect(dynamicArray).toHaveLength(arrayLength - 1);
        });
      });
    });

    describe('#remove', () => {
      const elem = 'element';
      let arrayLength;

      beforeAll(() => {
        dynamicArray.add(elem);
        arrayLength = dynamicArray.length;
      });
      afterAll(() => dynamicArray.clear());

      describe('when passing non existent element', () => {
        it('returns false', () => {
          expect(dynamicArray.remove(`other ${elem}`)).toBe(false);
        });
      });

      describe('when passing existent element', () => {
        let removedElem;

        beforeAll(() => {
          removedElem = dynamicArray.remove(elem);
        });

        it('returns the removed element', () => expect(removedElem).toBe(elem));

        it('removes the element from the array', () => {
          expect(dynamicArray.get(0)).not.toBe(elem);
        });

        it('decreases the length of the array by 1', () => {
          expect(dynamicArray).toHaveLength(arrayLength - 1);
        });
      });
    });

    describe('#indexOf', () => {
      const elem = 'element';

      beforeAll(() => dynamicArray.add(elem));
      afterAll(() => dynamicArray.clear());

      describe('when passing non existent element', () => {
        it('returns -1', () => expect(dynamicArray.indexOf(`other ${elem}`)).toBe(-1));
      });

      describe('when passing existent element', () => {
        it('returns the index of the element', () => {
          expect(dynamicArray.indexOf(elem)).toBe(0);
        });
      });
    });

    describe('#contains', () => {
      const elem = 'element';

      beforeAll(() => dynamicArray.add(elem));
      afterAll(() => dynamicArray.clear());

      describe('when passing non existent element', () => {
        it('returns false', () => {
          expect(dynamicArray.contains(`other ${elem}`)).toBe(false);
        });
      });

      describe('when passing existent element', () => {
        it('returns true', () => {
          expect(dynamicArray.contains(elem)).toBe(true);
        });
      });
    });
  });
});
