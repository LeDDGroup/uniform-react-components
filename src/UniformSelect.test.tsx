// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount } from "enzyme"
import { UniformSelect, UniformOptionProps } from "./index"

describe("<UniformSelect>", () => {
  it("should dispatch change event", () => {
    type MaleOrFemale = "male" | "female"
    const options: UniformOptionProps<MaleOrFemale>[] = [
      {
        value: "male",
        children: "Male",
      },
      {
        value: "female",
        children: "Female",
      },
    ]
    let changed: MaleOrFemale | null = null
    const wrapper = mount(
      <UniformSelect
        options={options}
        onChange={newValue => (changed = newValue)}
        defaultValue={"male"}
      />,
    )
    const input = wrapper.find("select")
    input.simulate("change", { target: { value: "female" } })
    expect(changed).toBe("female")
  })
})
