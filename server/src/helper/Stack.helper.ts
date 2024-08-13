export class Stack<T> {
  private utilList: T[] = [];

  push(item: T) {
    this.utilList.push(item);
  }

  pop() {
    return this.utilList.pop();
  }

  peek() {
    return this.utilList[-1];
  }

  len() {
    return this.utilList.length;
  }

  isEmpty() {
    return this.utilList.length == 0;
  }
}
