import * as React from "react"
import { UniformProps } from "./UniformComponent"
import { Omit } from "./type-helpers"

export class UniformInput extends React.Component<
  UniformProps<string, Omit<JSX.IntrinsicElements["input"], "onChange">>
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
