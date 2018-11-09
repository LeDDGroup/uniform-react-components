import React, { ComponentClass, SFC } from "react"
import Data, { IData } from "handle-data-change"

export interface IProps<D> {
  value: D
  onChange?: (newValue: D) => void
  path?: string[]
}

export interface UniformProps<D> {
  data: IData<D>
}

function equal<T>(a: T, b: T) {
  return a === b
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export function UniformComponent<P extends UniformProps<any>, D = P["data"]["value"]>(
  Component: ComponentClass<P> | SFC<P>,
) {
  let uniOnChange: (data: D) => void = () => null
  let uniValue: D = {} as D
  let uniPath: string[]
  let data = new Data<D>({} as D, uniOnChange)
  return function(props: IProps<D> & Omit<P, "data">) {
    const { onChange, value, defaultValue, path, ...rest } = props as any
    if (!equal(onChange, uniOnChange) || !equal(value, uniValue) || !equal(path, uniPath)) {
      uniOnChange = onChange
      uniValue = value
      uniPath = path
      data = new Data(value, onChange, path)
    }
    return <Component {...rest} data={data} />
  }
}
