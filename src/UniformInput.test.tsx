// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformInput } from "./index"

describe("<UniformInput>", () => {
  it("should dispatch change event", () => {
    let changed: null | string = null
    const wrapper = mount(
      <UniformInput onChange={newValue => (changed = newValue)} defaultValue="3" />,
    )
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "foo" } })
    expect(changed).toBe("foo")
  })
  it("should allow ommitting property onChange", () => {
    const wrapper = mount(<UniformInput defaultValue="3" />)
    wrapper.find("input").simulate("change", { target: { value: "foo" } })
  })
  it("should allow ommitting property defaultValue", () => {
    const wrapper = mount(<UniformInput />)
    wrapper.find("input").simulate("change", { target: { value: "foo" } })
  })
})
