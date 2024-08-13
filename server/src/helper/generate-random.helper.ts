
class GenerateRandom<T> {
  generateRandomElemList(elemList: T[]): T[] {
    if (elemList.length == 0) throw Error("We can't build any quiz for the time");

    if (elemList.length < 5) throw Error("Too few Questions for building a Quiz");

    const stack: T[] = [];
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * elemList.length);
      stack.push(elemList[random]);
    }

    return stack;
  }
}

export default GenerateRandom;
