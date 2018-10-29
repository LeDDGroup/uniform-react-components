// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformComponent } from "./index"

describe("<UniformComponent>", () => {
  class TestUniformComponent extends UniformComponent<{ bar: string }> {
    render() {
      return <input onChange={ev => this.onChange.bar(ev.target.value)} type="string" />
    }
  }
  it("should dispatch change event", () => {
    const defaultValue = { bar: "hello" }
    let changed: null | { bar: string } = null
    const wrapper = mount(
      <TestUniformComponent onChange={value => (changed = value)} defaultValue={defaultValue} />,
    )
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "foo" } })
    expect(changed).toMatchObject({ bar: "foo" })
  })
  it("should allow ommiting onChange property", () => {
    const defaultValue = { bar: "hello" }
    const wrapper = mount(<TestUniformComponent defaultValue={defaultValue} />)
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "foo" } })
  })
})
