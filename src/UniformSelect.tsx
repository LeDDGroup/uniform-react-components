import * as React from "react"
import { SafeJoin, Omit } from "./type-helpers"

export type UniformOptionProps<T> = SafeJoin<JSX.IntrinsicElements["option"], { value: T }>

type IProps<D, P = {}> = {
  value: D
  onChange?: (newValue: D) => void
  path?: string[]
} & P

export class UniformSelect<T extends string> extends React.Component<
  IProps<
    T,
    Omit<JSX.IntrinsicElements["select"], "onChange"> & { options?: UniformOptionProps<T>[] }
  >
> {
  _UniformSelectOnChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (this.props.onChange) {
      this.props.onChange(ev.target.value as T)
    }
  }
  render() {
    const { options, ...rest } = this.props
    return (
      <select {...rest} onChange={this._UniformSelectOnChange}>
        {options && options.map(prop => <option {...prop} key={prop.value} />)}
      </select>
    )
  }
}
