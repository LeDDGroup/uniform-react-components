// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount, configure } from "enzyme"
import { UniformComponent, UniformInput, UniformInputNumber } from "./index"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

it("should work together", () => {
  interface ISimpleData {
    age: number
    firstName: string
    lastName: string
  }
  class SimpleUniform extends UniformComponent<ISimpleData> {
    render() {
      return (
        <form>
          <UniformInput onChange={this.onChange.firstName} value={this.props.value.firstName} />
          <UniformInput onChange={this.onChange.lastName} value={this.props.value.lastName} />
          <UniformInputNumber onChange={this.onChange.age} value={this.props.value.age} />
        </form>
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
