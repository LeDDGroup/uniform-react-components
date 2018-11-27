import * as React from "react"
import { SafeJoin } from "./type-helpers"

export class UniformInput extends React.Component<
  SafeJoin<
    JSX.IntrinsicElements["input"],
    {
      value?: string
      defaultValue?: string
      onChange?: (value: string) => void
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
