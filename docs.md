# Reach Project Documentation

## Authentication

### Roles

Roles control which nav stack is rendered.

role    | ...
--      | --
`admin` | reach team members
`user`  | reach project members

## Component Libray

### Usage

To import a component, use the following import statement:

```jsx
import { BlockButton, ... } from '@app/components'
```

To add a component to the library, export the component from the file as a named export. Then re-export it in the index.ts file.

```jsx
/* components/MyComponent.tsx */
export const MyComponent = () => <></>;

/* components/index.ts */
export * from './MyComponent';
//...
```

### Block Button

Full with text button with multiple appearances. Will span full width of container, use padding on outside container to limit width. `outlined` prop toggles between outlined and filled appearance. Inherits all props from `TouchableOpacity`.
