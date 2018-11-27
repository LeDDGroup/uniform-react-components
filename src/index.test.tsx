// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount, configure } from "enzyme"
import { UniformInput, UniformInputNumber } from "./index"
import Adapter from "enzyme-adapter-react-16"
import { UniformComponent } from "./UniformComponent"

configure({ adapter: new Adapter() })

it("should work together", () => {
  interface ISimpleData {
    age: number
    firstName: string
    lastName: string
  }
  class SimpleUniform extends React.Component<{
    value: ISimpleData
    onChange: (data: ISimpleData) => void
  }> {
    render() {
      return (
        <UniformComponent defaultValue={this.props.value} onChange={this.props.onChange}>
          {data => (
            <form>
              <UniformInput onChange={data.change.firstName} value={data.value.firstName} />
              <UniformInput onChange={data.change.lastName} value={data.value.lastName} />
              <UniformInputNumber onChange={data.change.age} value={data.value.age} />
            </form>
          )}
        </UniformComponent>
      )
    }
  }

  let update: ISimpleData = {
    age: 1,
    firstName: "foo",
    lastName: "bar",
  }
  const wrapper = mount(<SimpleUniform onChange={value => (update = value)} value={update} />)
  const inputs = wrapper.find("input")
  inputs.at(0).simulate("change", { target: { value: "my-firstname" } })
  expect(update).toMatchObject({
    age: 1,
    firstName: "my-firstname",
    lastName: "bar",
  })
  inputs.at(1).simulate("change", { target: { value: "my-lastname" } })
  expect(update).toMatchObject({
    age: 1,
    firstName: "my-firstname",
    lastName: "my-lastname",
  })
  inputs.at(2).simulate("change", { target: { value: "6" } })
  expect(update).toMatchObject({
    age: 6,
    firstName: "my-firstname",
    lastName: "my-lastname",
  })
})
