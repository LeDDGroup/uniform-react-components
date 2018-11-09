// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformComponent, UniformProps } from "./index"

describe("<UniformComponent>", () => {
  class TestUniformComponent extends React.Component<
    UniformProps<{ bar: string }> & { asdf?: string }
  > {
    render() {
      return <input onChange={ev => this.props.data.change.bar(ev.target.value)} type="string" />
    }
  }
  const UniformTestComponent = UniformComponent(TestUniformComponent)
  it("should dispatch change event", () => {
    const defaultValue = { bar: "hello" }
    let changed: null | { bar: string } = null
    const wrapper = mount(
      <UniformTestComponent onChange={value => (changed = value)} value={defaultValue} />,
    )
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "foo" } })
    expect(changed).toMatchObject({ bar: "foo" })
  })
  it("should allow ommiting onChange property", () => {
    const defaultValue = { bar: "hello" }
    const wrapper = mount(<UniformTestComponent value={defaultValue} onChange={() => null} />)
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "foo" } })
  })
})
