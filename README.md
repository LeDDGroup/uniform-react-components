# uniform-react-components

[![Travis](https://travis-ci.org/LeDDGroup/uniform-react-components.svg?branch=master)](https://travis-ci.org/LeDDGroup/uniform-react-components)
[![npm version](https://img.shields.io/npm/v/uniform-react-components.svg "test")](https://www.npmjs.com/package/uniform-react-components)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: lynt](https://img.shields.io/badge/linter-lynt-E81AAF.svg)](https://github.com/saadq/lynt)

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
