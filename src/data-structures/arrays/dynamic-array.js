class DynamicArray {
  constructor(capacity) {
    const parsedCapacity = Number.parseInt(capacity);
    if (Number.isNaN(parsedCapacity) || parsedCapacity < 0)
      throw new Error('Capacity should be a positive number');

    this.len = 0;
    this.capacity = parsedCapacity;
    this.arr = new Array(parsedCapacity);
  }

  get size() {
    return this.len;
  }

  isEmpty() {
    return this.size === 0;
  }

  get(index) {
    return this.arr[index];
  }

  set(index, elem) {
    arr[index] = elem;
  }

  clear() {
    for(let i = 0; i < this.capacity; i++) {
      this.arr[i] = undefined;
    }
    this.len = 0;
    return this;
  }

  add(elem) {
    if (this.len + 1 >= this.capacity) {
      if (this.capacity === 0) this.capacity++;
      else this.capacity *= 2;
      let newArr = new Array(this.capacity);
      for(let i = 0; i < this.len; i++) {
        newArr[i] = this.arr[i];
      }
      this.arr = newArr;
    }

    this.arr[this.len] = elem;
    this.len++;
    return this;
  }
}

export default DynamicArray;
