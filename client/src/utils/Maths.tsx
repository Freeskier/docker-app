export class Maths {
  static Random(min: number, max: number): number {
    const str = (Math.random() * (max - min) + min).toFixed(4);

    return parseFloat(str);
  }
}
