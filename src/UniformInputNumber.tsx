import * as React from "react"
import { UniformProps } from "./UniformComponent"
import { Omit } from "utility-types"

export class UniformInputNumber extends React.Component<
  UniformProps<
    number,
    Omit<JSX.IntrinsicElements["input"], "onChange" | "defaultValue"> & {
      defaultValue: number
    }
  >
> {
  private _UniformInputOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(parseInt(ev.target.value, 10))
    }
  }
  render() {
    return (
      <input
        {...this.props}
        onChange={this._UniformInputOnChange}
        defaultValue={this.props.defaultValue.toString()}
      />
    )
  }
}
