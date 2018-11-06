import * as React from "react"
import { UniformProps } from "./UniformComponent"
import { SafeJoin } from "./type-helpers"

export class UniformInput extends React.Component<
  SafeJoin<
    SafeJoin<JSX.IntrinsicElements["input"], UniformProps<string>>,
    {
      defaultValue?: string
    }
  >
> {
  private _UniformInputOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(ev.target.value)
    }
  }
  render() {
    return <input {...this.props} onChange={this._UniformInputOnChange} />
  }
}
