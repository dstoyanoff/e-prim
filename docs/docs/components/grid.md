---
title: Grid
sidebar_position: 4
---

As with flex, grid is also widely used for creating layouts. This components exposes some core properties to help you prototype faster. This component is in beta, so any suggestions for additional properties are welcome. As usual, all Box props are also available here.

```tsx
// columns can be defined in multiple ways
// [2] - 2 columns, each 1fr in width
// [2, "50%"] - 2 columns, each 50% in width (or whatever string you pass, we won't change it)
// [2, 100] - 2 columns, each 100px in width
// [2, [100, 200]] - 2 columns, 100px and 200px respectively
// [2, ["50%", 100]] - 2 columns, 50% and 100px respectively

<Grid columns={[2, [100, 200]]}>
  <Box>item1</Box>
  <Box>item2</Box>
</Grid>
```

## API

```ts
/**
 * The gap has the same system as margins and paddings,
 * where you can either specify a number and use it with the theme spacing multiplier or you can provide a raw string to be used
 */
gap?: ResponsiveValue<SpacingUnit>;

/**
 * Columns configuration as an array
 * The first value is the number of columns that are rendered
 * The second value configures their sizes. Can be configured in 3 ways:
 * number - applies the number to all columns in pixels
 * string - applies the value to all columns without modifications
 * array - applies the given values using the above logic, but without repeat
 * @default 1fr
 */
columns?: [ResponsiveValue<number>, ResponsiveValue<string | number | (string | number)[]>?];
```
