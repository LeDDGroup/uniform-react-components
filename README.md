# uniform-react-components

Components with the same simple interface to handle onChange events

## Example

```tsx
import { UniformComponent } from  "uniform-react-components"

class ComplexForm extends UniformComponent<{
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

// Render Element
<ComplexForm defaultValue={{bar: "3"}} onChange((newValue) => console.log(newValue)) />
```
