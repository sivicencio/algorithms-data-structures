import Node from './node';

class DoublyLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  clear() {
    let trav = this.head;
    while (trav !== null) {
      const { next } = trav;
      trav.prev = null;
      trav.next = null;
      trav.data = null;
      trav = next;
    }
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  addFirst(elem) {
    if (this.isEmpty()) {
      const newNode = new Node(elem, null, null);
      this.head = newNode;
      this.tail = newNode;
    } else {
      const newNode = new Node(elem, null, this.head);
      this.head.prev = newNode;
      this.head = this.head.prev;
    }
    this.size += 1;
  }

  addLast(elem) {
    if (this.isEmpty()) {
      const newNode = new Node(elem, null, null);
      this.tail = newNode;
      this.head = newNode;
    } else {
      const newNode = new Node(elem, this.tail, null);
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
    this.size += 1;
  }

  add(elem) {
    this.addLast(elem);
  }

  peekFirst() {
    if (this.isEmpty()) throw new Error('Empty list');
    return this.head.data;
  }

  peekLast() {
    if (this.isEmpty()) throw new Error('Empty list');
    return this.tail.data;
  }

  removeFirst() {
    if (this.isEmpty()) throw new Error('Empty list');

    const { data } = this.head;
    this.head = this.head.next;
    this.size -= 1;

    if (this.isEmpty()) this.tail = null;
    else this.head.prev = null;

    return data;
  }

  removeLast() {
    if (this.isEmpty()) throw new Error('Empty list');

    const { data } = this.tail;
    this.tail = this.tail.prev;
    this.size -= 1;

    if (this.isEmpty()) this.head = null;
    else this.tail.next = null;

    return data;
  }

  /* eslint-disable no-param-reassign */
  removeNode(node) {
    if (node.prev === null) return this.removeFirst();
    if (node.next === null) return this.removeLast();

    node.prev.next = node.next;
    node.next.prev = node.prev;

    const { data } = node;
    node = null;

    this.size -= 1;

    return data;
  }
  /* eslint-enable no-param-reassign */

  removeAt(index) {
    if (index < 0 || index >= this.size) throw new RangeError('Index out of bounds');

    let trav;
    let i;
    if (index < this.size / 2) {
      for (i = 0, trav = this.head; i !== index; i += 1) {
        trav = trav.next;
      }
    } else {
      for (i = this.size - 1, trav = this.tail; i !== index; i -= 1) {
        trav = trav.prev;
      }
    }
    return this.removeNode(trav);
  }

  remove(elem) {
    let trav;
    for (trav = this.head; trav !== null; trav = trav.next) {
      if (trav.data === elem) {
        this.removeNode(trav);
        return true;
      }
    }
    return false;
  }

  indexOf(elem) {
    let trav;
    let index = 0;

    for (trav = this.head; trav !== null; trav = trav.next, index += 1) {
      if (trav.data === elem) return index;
    }
    return -1;
  }

  contains(elem) {
    return this.indexOf(elem) !== -1;
  }
}

export default DoublyLinkedList;
