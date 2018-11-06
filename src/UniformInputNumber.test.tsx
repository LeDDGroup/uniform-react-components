// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformInputNumber } from "./index"

describe("<UniformInputNumber>", () => {
  it("should dispatch change event", () => {
    let changed: null | number = null
    const wrapper = mount(
      <UniformInputNumber type="number" onChange={newValue => (changed = newValue)} value={3} />,
    )
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "6" } })
    expect(changed).toBe(6)
  })
  it("should allow ommitting property onChange", () => {
    const wrapper = mount(<UniformInputNumber value={3} />)
    wrapper.find("input").simulate("change", { target: { value: "6" } })
  })
  it("should allow ommitting property defaultValue", () => {
    const wrapper = mount(<UniformInputNumber />)
    wrapper.find("input").simulate("change", { target: { value: "6" } })
  })
})
