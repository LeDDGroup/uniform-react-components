// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformInputNumber } from "./index"

describe("<UniformInputNumber>", () => {
  it("should dispatch change event", () => {
    let changed: null | number = null
    const wrapper = mount(
      <UniformInputNumber
        type="number"
        onChange={newValue => (changed = newValue)}
        defaultValue={3}
      />,
    )
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "6" } })
    expect(changed).toBe(6)
  })
})