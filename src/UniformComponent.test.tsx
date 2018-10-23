// tslint:disable
import * as React from "react";
import { shallow, configure } from "enzyme";
import { UniformComponent } from "./UniformComponent";
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
    const wrapper = shallow(
      <TestUniformComponent
        onChange={value => (changed = value)}
        defaultValue={defaultValue}
      />
    );
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "foo" } });
    expect(changed).toMatchObject({ bar: "foo" });
  });
});
