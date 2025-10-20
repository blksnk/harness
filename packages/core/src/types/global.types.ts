/**
 * Any valid function
 */
export interface AnyFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): any;
}

export type StringKeyOf<T> = keyof T & string;
