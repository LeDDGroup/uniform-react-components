// tslint:disable:jsx-no-lambda
import * as React from "react"
import { mount, configure } from "enzyme"
import { UniformChildProps, UniformInput, UniformInputNumber } from "./index"
import Adapter from "enzyme-adapter-react-16"
import { UniformComponent } from "./UniformComponent"

configure({ adapter: new Adapter() })

it("should work together", () => {
  interface ISimpleData {
    age: number
    firstName: string
    lastName: string
  }
  class SimpleUniform extends React.Component<UniformChildProps<ISimpleData>> {
    render() {
      return (
        <form>
          <UniformInput
            onChange={this.props.data.change.firstName}
            value={this.props.data.value.firstName}
          />
          <UniformInput
            onChange={this.props.data.change.lastName}
            value={this.props.data.value.lastName}
          />
          <UniformInputNumber
            onChange={this.props.data.change.age}
            value={this.props.data.value.age}
          />
        </form>
      )
    }
  }

  const SimpleUniformWrapper = UniformComponent(SimpleUniform)

  let update: ISimpleData = {
    age: 1,
    firstName: "foo",
    lastName: "bar",
  }
  const wrapper = mount(
    <SimpleUniformWrapper onChange={value => (update = value)} value={update} />,
  )
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
