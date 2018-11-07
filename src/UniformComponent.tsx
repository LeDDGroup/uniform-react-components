import React, { ComponentClass /* useState  */ } from "react"
import Data from "handle-data-change"

export interface IData<D> {
  onChange?: (newValue: D) => void
  value: D
  defaultValue?: D // DEPRECATED
}

export type UniformProps<D, P = {}> = IData<D> & P

export interface UniformChildProps<D> {
  data: Data<D>
}

export function UniformComponent<D, H>(Component: ComponentClass<UniformChildProps<D> & H>) {
  let onChangeFunction: (data: D) => void = () => null
  const data = new Data<D>({} as D, (data: D) => onChangeFunction(data))
  return function<H>(props: UniformProps<D> & H) {
    const { onChange, value, defaultValue, ...rest } = props as any
    data.value = value || defaultValue
    onChangeFunction = onChange
    return <Component {...rest} data={data} />
  }
}
