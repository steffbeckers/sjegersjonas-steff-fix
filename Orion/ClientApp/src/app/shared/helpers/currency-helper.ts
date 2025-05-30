export class CurrencyHelper {
  static formatCents(cents: number): number {
    if(Number.isInteger(cents)) {
      return cents / 100;
    }
    return 0;
  }

  static euroToCents(euro: number | string): number {
    const price = (typeof euro === 'number') ? euro : parseFloat(euro);
    if(!isNaN(price)) {
      return Math.round(price * 100);
    }
    return 0;
  }
}
