// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformComponent } from "./index"

describe("<UniformComponent>", () => {
  it("should dispatch change event", () => {
    const defaultValue = { bar: "hello" }
    let changed: null | { bar: string } = null
    const wrapper = mount(
      <UniformComponent onChange={value => (changed = value)} defaultValue={defaultValue}>
        {data => <input onChange={ev => data.change.bar(ev.target.value)} type="string" />}
      </UniformComponent>,
    )
    const input = wrapper.find("input")
    input.simulate("change", { target: { value: "foo" } })
    expect(changed).toMatchObject({ bar: "foo" })
  })
})
