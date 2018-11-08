# uniform-react-components

[![Travis](https://travis-ci.org/LeDDGroup/uniform-react-components.svg?branch=master)](https://travis-ci.org/LeDDGroup/uniform-react-components)
[![npm version](https://img.shields.io/npm/v/uniform-react-components.svg "test")](https://www.npmjs.com/package/uniform-react-components)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![linter: lynt](https://img.shields.io/badge/linter-lynt-E81AAF.svg)](https://github.com/saadq/lynt)

HOC for creating components with the same simple interface to handle onChange events on react components

Also exports Input and Select components using this pattern to help with implementation of forms and such

## Features

- Generate efficient onChange handlers, so you don't have to make every one of them manually
- Easy form creation with components with the same interface
- Great typescript support

## Usage

### For a class component

```tsx
import { UniformComponent, UniformProps } from "uniform-react-components"

const MyUniformComponent = UniformComponent(
  class MyComponent extends React.Component<UniformProps<{ foo: string }, { customProp: string }>> {
    render() {
      return (
        <div>
          Custom prop: {this.props.customProp}
          <input
            name={this.props.data.path.foo.join(".")}
            type="text"
            value={this.props.data.value.foo || "undef"}
          />
        </div>
      )
    }
  },
)
```

### For a SFC (stateless functional component)

```tsx
import { UniformComponent, UniformProps } from "uniform-react-components"

const MyUniformComponent = UniformComponent(
  (props: UniformProps<{ foo: string }, { customProp: string }>) => (
    <div>
      Custom prop: {props.customProp}
      <input
        name={props.data.path.foo.join(".")}
        type="text"
        value={props.data.value.foo || "undef"}
      />
    </div>
  ),
)
```

## UniformComponent

The UniformComponent is the main component of uniform-react-components, it's a HOC which is used to make simple components for handling forms and subforms, or anything that holds a value and can be changed.

All components created with 'UniformComponent' receive the props specified, plus a `data` which holds this helpers:

```ts
interface IData {
  path
  value
  onChange
}
```

For example, for this type

```ts
interface ISimpleData {
  age: number
  password: string
  username: string
}
```

The component will receive in the `props.data` handlers like if you did:

```tsx
props.data = {
  value: {
    age: 3,
    password: "myPassword",
    username: "myUsername",
  },
  change: {
    age: newAge => {
      /* dispatch this.props.onChange({ ...previousData, age: newAge })*/
    },
    password: newPassword => {
      /* dispatch this.props.onChange({ ...previousData, password: newPassword })*/
    },
    username: newUsername => {
      /* dispatch this.props.onChange({ ...previousData, username: newUsername })*/
    },
  },
  path: {
    age: ["previousPath", "otherPreviousPath", "age"],
    password: ["previousPath", "otherPreviousPath", "password"],
    username: ["previousPath", "otherPreviousPath", "username"],
  },
}
```

Full example:

```tsx
interface IData {
  foo?: string
  bar: number
}

interface IProps {
  hidden?: boolean
}

const MyUniformComponent = UniformComponent(
  class MyComponent extends React.Component<UniformProps<IData, IProps>> {
    render() {
      return (
        <div>
          {this.props.hidden ? "is hidden" : "is visible"}
          <input
            name={this.props.data.path.foo.join(".")}
            type="text"
            value={this.props.data.value.foo || "undef"}
          />
          <input
            name={this.props.data.path.bar.join(".")}
            type="text"
            value={this.props.data.value.bar}
          />
        </div>
      )
    }
  },
)

const MyUniForm = UniformComponent((props: UniformProps<{ a: IData; b: IData }>) => (
  <form action="">
    <MyUniformComponent value={props.data.value.a} />
    <MyUniformComponent hidden={true} value={props.data.value.b} />
  </form>
))
```

Then mount `MyUniForm` component:

```tsx
  <MyUniForm onChange={(data) => console.log(data} value={{a: { bar: 3}, b: { bar: 5}}} />
```

and every time the user types in the inputs, it will be outputted the value

## Built-in helpers

uniform-react-components exports two input helpers ( _UniformInput_ and _UniformInputNumber_ ) and a select helper that have the same interface, it only changes the _onChange_ ( and _defaultValue_ which is the case of _UniformInputNumber_ ) properties, and accepts all the properties of a plain `input` element. This only saves you the trouble of implementing these components, but you could implement them if you want to, and even add some more.

### UniformInput

The same as the plain input element, but the onChange property returns an string instead of a change input event

```tsx
<UniformInput
  onChange={newValue => console.log(`This is my value ${newValue}`)} // newValue is string
  defaultValue="hello"
  // you can add all the other properties such as type, className, style...
/>
```

### UniformInputNumber

The same as the plain input element, but the onChange property returns an _number_ instead of a change input event, and the defaultValue accepts an number too. You must still set the `type="number"` property if you want a number input

```tsx
<UniformInputNumber
  onChange={newValue => console.log(`This is my value ${newValue}`)} // newValue is number
  defaultValue={3} // typescript complains if it's string
  type="number"
  // you can add all the other properties such as className, style...
/>
```

### UniformSelect

```tsx
import { UniformSelect, UniformOptionProps } from "./index"
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
    const el = <UniformSelect options={options} onChange={(newValue) => console.log(newValue)} defaultValue={"male"} />, // newValue is MaleOrFemale
/>
```

The options is an array of Options, which has all the properties the option element takes, but value is restricted to the specified type, so it enforces type safety
