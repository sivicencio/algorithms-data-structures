class DynamicArray {
  constructor(capacity = 10) {
    const parsedCapacity = parseInt(capacity, 10);
    if (Number.isNaN(parsedCapacity) || parsedCapacity < 0) throw new RangeError('Capacity should be a positive number');

    this.len = 0;
    this.capacity = parsedCapacity;
    this.arr = new Array(parsedCapacity);
  }

  get length() {
    return this.len;
  }

  isEmpty() {
    return this.length === 0;
  }

  get(index) {
    return this.arr[index];
  }

  set(index, elem) {
    if (this.get(index) === undefined) throw new Error('Only existing elements can be set');
    this.arr[index] = elem;
  }

  clear() {
    for (let i = 0; i < this.capacity; i += 1) {
      this.arr[i] = undefined;
    }
    this.len = 0;
    return this;
  }

  add(elem) {
    if (this.len + 1 >= this.capacity) {
      this.capacity = this.capacity !== 0 ? this.capacity * 2 : 1;
      const newArr = new Array(this.capacity);
      for (let i = 0; i < this.len; i += 1) {
        newArr[i] = this.arr[i];
      }
      this.arr = newArr;
    }

    this.arr[this.len] = elem;
    this.len += 1;
    return this;
  }

  removeAt(index) {
    if (index >= this.len || index < 0) throw new RangeError('Index out of bounds');
    const elem = this.arr[index];
    const newArr = new Array(this.capacity);
    for (let i = 0, j = 0; i < this.len; i += 1, j += 1) {
      if (i === index) j -= 1;
      else newArr[j] = this.arr[i];
    }
    this.arr = newArr;
    this.len -= 1;
    return elem;
  }

  remove(elem) {
    for (let i = 0; i < this.len; i += 1) {
      if (this.arr[i] === elem) return this.removeAt(i);
    }
    return false;
  }

  indexOf(elem) {
    for (let i = 0; i < this.len; i += 1) {
      if (this.arr[i] === elem) return i;
    }
    return -1;
  }

  contains(elem) {
    return this.indexOf(elem) !== -1;
  }
}

export default DynamicArray;
