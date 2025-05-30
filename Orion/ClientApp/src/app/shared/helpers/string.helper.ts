export class StringHelper {
  static isEmptyOrNull(str: string | null): boolean {
    if(str === null) { return true; }
    if(typeof(str) === 'string' && str.trim().length === 0) { return true; }
    return false;
  }

  static trim(str: string): string {
    if (typeof(str) === 'string') {
      return str.trim();
    }
    return str;
  }

  static trimOrSetNull(str: string | null): string | null {
    if(this.isEmptyOrNull(str)) {
      return null;
    }
    return this.trim(str!);
  }

  static covertToBooleanOrNull(str: string | null): boolean | null {
    if(this.isEmptyOrNull(str)) { return null; }
    const parsed = parseInt(str!);
    if(isNaN(parsed)) { return null; }
    return (parsed === 0 || parsed === 1);
  }
}
