import { Component } from "react"
import { dynamicOnChange } from "dynamic-on-change"

export type UniformProps<D, P> = {
  onChange?: (newValue: D) => void
  defaultValue: D
} & P

export class UniformComponent<D, P = {}, S = {}, SS = any> extends Component<
  UniformProps<D, P>,
  S,
  SS
> {
  private _UniformData: D = this.props.defaultValue
  private _UniformOnChange = (key: keyof D, value: D[keyof D]) => {
    this._UniformData[key] = value
    if (this.props.onChange) {
      this.props.onChange(this._UniformData)
    }
  }
  protected onChange = dynamicOnChange<D>(this._UniformOnChange)
}
