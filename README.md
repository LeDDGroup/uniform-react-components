# uniform-react-components

Components with the same simple interface to handle onChange events

Also exports Input components using this pattern to help with implementation of forms and such

```tsx
import {
  UniformComponent,
  UniformInput,
  UniformInputNumber
} from "uniform-react-components";

interface ISimpleData {
  age: number;
  password: string;
  username: string;
}
class SimpleUniform extends UniformComponent<ISimpleData> {
  render() {
    return (
      <form>
        <UniformInput
          onChange={this.onChange.username}
          defaultValue={this.props.defaultValue.username}
        />
        <UniformInput
          type="password"
          onChange={this.onChange.password}
          defaultValue={this.props.defaultValue.password}
        />
        <UniformInputNumber
          type="number"
          onChange={this.onChange.age}
          defaultValue={this.props.defaultValue.age}
        />
      </form>
    );
  }
}

// Render Element
const el = (
  <SimpleUniform
    onChange={newValue => console.log(newValue)}
    defaultValue={{ age: 0, password: "", username: "" }}
  />
);
```
