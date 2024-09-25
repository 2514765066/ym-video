export class History {
  stack: string[] = [];

  constructor(val: string) {
    this.push(val);
  }

  push(value: string) {
    if (this.last() == value) {
      return;
    }

    this.stack.push(value);
  }

  pop() {
    if (this.stack.length == 1) {
      return this.stack[0];
    }

    this.stack.pop();

    return this.last()!;
  }

  last() {
    return this.stack.at(-1);
  }
}
