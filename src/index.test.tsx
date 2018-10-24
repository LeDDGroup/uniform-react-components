// tslint:disable
import * as React from "react";
import { mount, configure } from "enzyme";
import { UniformComponent, UniformInput, UniformInputNumber } from "./index";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<UniformComponent>", () => {
  it("should dispatch change event", () => {
    class TestUniformComponent extends UniformComponent<{
      bar: string;
    }> {
      render() {
        return (
          <input
            onChange={ev => this.onChange.bar(ev.target.value)}
            type="string"
          />
        );
      }
    }

    const defaultValue = { bar: "hello" };
    let changed: null | { bar: string } = null;
    const wrapper = mount(
      <TestUniformComponent
        onChange={value => (changed = value)}
        defaultValue={defaultValue}
      />
    );
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "foo" } });
    expect(changed).toMatchObject({ bar: "foo" });
  });
  it("should work with <UniformInput> and <UniformInputString>", () => {
    interface ISimpleData {
      age: number;
      firstName: string;
      lastName: string;
    }
    class SimpleUniform extends UniformComponent<ISimpleData> {
      render() {
        return (
          <form>
            <UniformInput
              onChange={this.onChange.firstName}
              defaultValue={this.props.defaultValue.firstName}
            />
            <UniformInput
              onChange={this.onChange.lastName}
              defaultValue={this.props.defaultValue.lastName}
            />
            <UniformInputNumber
              onChange={this.onChange.age}
              defaultValue={this.props.defaultValue.age}
            />
          </form>
        );
      }
    }
    let update: ISimpleData = {
      age: 1,
      firstName: "foo",
      lastName: "bar"
    };
    const wrapper = mount(
      <SimpleUniform
        onChange={value => (update = value)}
        defaultValue={update}
      />
    );
    const inputs = wrapper.find("input");
    inputs.at(0).simulate("change", { target: { value: "my-firstname" } });
    expect(update).toMatchObject({
      age: 1,
      firstName: "my-firstname",
      lastName: "bar"
    });
    inputs.at(1).simulate("change", { target: { value: "my-lastname" } });
    expect(update).toMatchObject({
      age: 1,
      firstName: "my-firstname",
      lastName: "my-lastname"
    });
    inputs.at(2).simulate("change", { target: { value: "6" } });
    expect(update).toMatchObject({
      age: 6,
      firstName: "my-firstname",
      lastName: "my-lastname"
    });
  });
});

describe("<UniformInput>", () => {
  it("should dispatch change event", () => {
    let changed: null | string = null;
    const wrapper = mount(
      <UniformInput
        onChange={newValue => (changed = newValue)}
        defaultValue="3"
      />
    );
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "foo" } });
    expect(changed).toBe("foo");
  });
});

describe("<UniformInputNumber>", () => {
  it("should dispatch change event", () => {
    let changed: null | number = null;
    const wrapper = mount(
      <UniformInputNumber
        type="number"
        onChange={newValue => (changed = newValue)}
        defaultValue={3}
      />
    );
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "6" } });
    expect(changed).toBe(6);
  });
});
