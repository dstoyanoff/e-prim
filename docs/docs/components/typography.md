---
title: Typography
sidebar_position: 2
---

After all, the websites are all about text. Typography is heavily used whatever you do, so this component should help you simplify your code and ship faster. It exposes very simple system that you can use to style your texts. Of course, all Box properties are also supported here

```tsx
<Typography variant="title.1" align="center" uppercase noWrap textOverflow="ellipsis">
  My text is great!
</Typography>
```

## API

The API of the typography component is very simple, yet giving some level of abstractions

```ts
/**
 * The variant is what makes your texts consistent. As you might expect, this is a dot notation of the
 * typography structure you have defined in the theme.
 * If omitted, the styles from theme.typography.default will be applied
 */
variant?: TypographyKey;

/**
 * Booleans are very nice in react as you only type the key and don't need a value.
 * These 2 props give you a shorthand of setting CSS props
 */
uppercase?: boolean;
noWrap?: boolean;

/**
 * The following properties are just raw CSS properties exposed as component props for convenience.
 * Their value is not modified in any form, except for responsiveness, where defined
 */
align?: ResponsiveValue<CssProperties["textAlign"]>;
textOverflow?: ResponsiveValue<CssProperties["textOverflow"]>;
```
