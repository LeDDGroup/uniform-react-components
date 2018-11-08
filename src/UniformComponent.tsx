import React, { ComponentClass, SFC } from "react"
import Data, { IData } from "handle-data-change"

export { IData }

export type IProps<D, P = {}> = {
  value: D
  onChange?: (newValue: D) => void
  path?: string[]
} & P

export type UniformProps<D, P = {}> = {
  data: IData<D>
} & P

function equal<T>(a: T, b: T) {
  return a === b
}

export function UniformComponent<D, H>(
  Component: ComponentClass<UniformProps<D, H>> | SFC<UniformProps<D, H>>,
) {
  let uniOnChange: (data: D) => void = () => null
  let uniValue: D = {} as D
  let uniPath: string[]
  let data = new Data<D>({} as D, uniOnChange)
  return function<H>(props: IProps<D> & H) {
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
