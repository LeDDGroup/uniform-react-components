import React from "react"
import Data from "handle-data-change"

export interface IProps<D = {}> {
  defaultValue: D
  value?: D
  onChange?: (value: D) => void
  path?: string[]
  children: (data: Data<D>) => JSX.Element
}

export class UniformComponent<D> extends React.Component<IProps<D>, D> {
  data = new Data(
    this.props.value || this.props.defaultValue,
    (data: D) => this.onChange(data),
    this.props.path,
  )
  state = this.data.value
  render() {
    this.data.value = this.props.value || this.data.value
    return this.props.children(this.data)
  }
  private onChange(value: D) {
    this.setState(value)
    this.props.onChange && this.props.onChange(value)
  }
}
