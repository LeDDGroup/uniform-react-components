import * as React from "react"
import { SafeJoin } from "./type-helpers"

export class UniformInputNumber extends React.Component<
  SafeJoin<
    JSX.IntrinsicElements["input"],
    {
      value?: number
      defaultValue?: number
      onChange?: (value: number) => void
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
