import { Component } from "react"
import { HandleDataChange } from "handle-data-change"
import { dynamicOnChanges } from "dynamic-on-change"

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
  constructor(props: UniformProps<D, P>) {
    super(props)
    const data = new HandleDataChange(props.value, data => props.onChange && props.onChange(data))
    this.onChange = data.change
  }
  protected onChange: dynamicOnChanges<D>
}
