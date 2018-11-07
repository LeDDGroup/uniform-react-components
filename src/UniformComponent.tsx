import { Component } from "react"
import { dynamicOnChange } from "dynamic-on-change"

export type UniformProps<D, P = {}> = {
  onChange?: (newValue: D) => void
  value: D
  defaultValue?: D // DEPRECATED
} & P

export class UniformComponent<D, P = {}, S = {}, SS = any> extends Component<
  UniformProps<D, P>,
  S,
  SS
> {
  private _UniformData: D = this.props.value
  public componentDidUpdate() {
    this._UniformData = this.props.value
  }
  protected onChange = dynamicOnChange<D>((key, value) => {
    this._UniformData[key] = value
    if (this.props.onChange) {
      this.props.onChange(this._UniformData)
    }
  })
}
