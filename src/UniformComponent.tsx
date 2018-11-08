import React, { ComponentClass /* useState  */ } from "react"
import Data, { IData } from "handle-data-change"

export { IData }

export type IProps<D, P = {}> = {
  onChange?: (newValue: D) => void
  value: D
  defaultValue?: D // DEPRECATED
} & P

export type UniformProps<D, P = {}> = {
  data: IData<D>
} & P

export function UniformComponent<D, H>(Component: ComponentClass<UniformProps<D, H>>) {
  let onChangeFunction: (data: D) => void = () => null
  const data = new Data<D>({} as D, (data: D) => onChangeFunction(data))
  return function<H>(props: IProps<D> & H) {
    const { onChange, value, defaultValue, ...rest } = props as any
    data.value = value || defaultValue
    onChangeFunction = onChange
    return <Component {...rest} data={data} />
  }
}
