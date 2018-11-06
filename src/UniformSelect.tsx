import * as React from "react"
import { UniformComponent } from "./UniformComponent"
import { SafeJoin, Omit } from "./type-helpers"

export type UniformOptionProps<T> = SafeJoin<JSX.IntrinsicElements["option"], { value: T }>

export class UniformSelect<T extends string> extends UniformComponent<
  T,
  Omit<JSX.IntrinsicElements["select"], "onChange"> & { options?: UniformOptionProps<T>[] }
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
