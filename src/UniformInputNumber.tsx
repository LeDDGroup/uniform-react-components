import * as React from "react"
import { UniformProps } from "./UniformComponent"
import { SafeJoin } from "./type-helpers"

export class UniformInputNumber extends React.Component<
  SafeJoin<
    SafeJoin<JSX.IntrinsicElements["input"], UniformProps<number>>,
    {
      defaultValue?: number
    }
  >
> {
  private _UniformInputOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(parseInt(ev.target.value, 10))
    }
  }
  render() {
    const defaultValue =
      this.props.defaultValue === undefined ? "0" : this.props.defaultValue.toString()
    return (
      <input {...this.props} onChange={this._UniformInputOnChange} defaultValue={defaultValue} />
    )
  }
}
