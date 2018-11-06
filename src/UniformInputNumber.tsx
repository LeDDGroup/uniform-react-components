import * as React from "react"
import { UniformProps } from "./UniformComponent"
import { SafeJoin } from "./type-helpers"

export class UniformInputNumber extends React.Component<
  SafeJoin<
    SafeJoin<JSX.IntrinsicElements["input"], UniformProps<number>>,
    {
      value?: number
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
    const props = {
      ...this.props,
      ...(this.props.value === undefined ? {} : { value: this.props.value.toString() }),
      ...(this.props.defaultValue === undefined
        ? {}
        : { defaultValue: this.props.defaultValue.toString() }),
    } as any
    return <input {...props} onChange={this._UniformInputOnChange} />
  }
}
