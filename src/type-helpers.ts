// From Typescript docs
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type SafeJoin<T, K> = Omit<T, keyof K> & K
