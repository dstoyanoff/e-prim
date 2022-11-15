---
title: useColorByKey
sidebar_position: 1
---

The `useColorByKey` hook can be used in your components to resolve a color value, given a `PaletteKey`.

```tsx
const Button: FC<{ color: PaletteKey }> = ({ color }) => {
  const background = useColorByKey(color);

  return <Box as="button" background={background} />
}

```
