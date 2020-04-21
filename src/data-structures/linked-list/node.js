class Node {
  constructor(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }

  toString() {
    return this.data;
  }
}

export default Node;
