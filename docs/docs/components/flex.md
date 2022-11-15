---
title: Flex
sidebar_position: 3
---

## Introduction

Most of the times, the layouts are prototyped by extensively using flex layouts. Configuring its CSS can however get very verbose. This component helps by defining some common props that will help you code faster. As expected, the flex component also exposes all properties of the Box, which won't be described here.

```tsx
<Flex direction="column" gap={4} center>
  <Box>item1</Box>
  <Box>item2</Box>
</Flex>
```

## API

The API of the flex component is very simple, yet giving some level of abstractions

```ts
/**
 * direction, justify and align are basically just exposing the CSS properties to the component, using a name that is slightly shorter
 */
direction?: ResponsiveValue<CSSObject["flexDirection"]>;
justify?: ResponsiveValue<CSSObject["justifyContent"]>;
align?: ResponsiveValue<CSSObject["alignItems"]>;

/**
 * The gap has the same system as margins and paddings,
 * where you can either specify a number and use it with the theme spacing multiplier or you can provide a raw string to be used
 */
gap?: ResponsiveValue<SpacingUnit>;

/**
 * The centering properties are a sugar on top of justify and align. They give you the option to easily center the content in 3 ways:
 * - center - fully center in both directions
 * - centerMain - center on the main axis
 * - centerCross - center on the cross axis
 */
center?: ResponsiveValue<boolean>;
centerMain?: ResponsiveValue<boolean>;
centerCross?: ResponsiveValue<boolean>;
```
