---
title: Box
sidebar_position: 1
---

## Introduction

The box component is the base of all. It's the most basic component and it should preferably used as a base for every component in your library. It lies on the concept of the `as` prop, where you tell the Box what HTML element to render. Based on that prop, not only the DOM changes, but you will get a full auto-complete of the properties of that specific HTML element that you've selected (thanks [react-polymorphic-box](https://github.com/kripod/react-polymorphic-box) for the inspiration). The default HTML element if none is specified is a plain `div`.

The box also exposes all system properties for your usage, so you can style it easily. Here is a brief of what it looks like:

```tsx
/**
 * regular div with:
 * - padding on all sides equal to 4px
 * - margin on all sides equal to 8px for small devices and 16px for big devices
 */
<Box p={1} m={{ xs: 2, md: 4 }} width="100%">
  ...content
</Box>

<Box as="button" onClick={console.log}>
  My Button
</Box>

// specifying an a element will automatically allow you to add href property
<Box as="a" href="https://dstoyanoff.github.io/e-prim>
  e-prim
</Box>
```

### ResponsiveValue

As shown in the above example, most of the values can either take the form a simple value or a responsive value. The type for that looks like this:

```ts
export type ResponsiveValue<T> = T | Partial<Record<keyof TBreakpoint, T>>;
```

When a property is defined a responsive one, you choose whether to just specify the value in it's type or provide an object that contains a breakpoint value as a key and the exact value of the property to use for that breakpoint. This saves you from manually writing media queries, which greatly reduces the code.

## API

The full box API is described below.

As a base, the box inherits `ComponentProps<E>`, where `E` extends React's `ElementType`. This gives us all HTML properties, which we won't describe here, but only the added ones. The CSSObject type is the one exported from `@emotion/react`

```ts
/**
 * Specify the HTML element to render to the DOM.
 * The ElementType comes from React itself and lists all possible tags
 */
as?: ElementType;

/**
 * Background and color accept a color key. The color key is a dot notation of the structure you've defined in your theme.
 * With the example theme that we've defined, it would look like "primary.normal" or "neutral.2".
 * Internally, this will resolve the value from your theme and put it in the CSS
 */

background?: PaletteKey;
color?: PaletteKey;

/**
 * The borders have the same logic as the colors, with the addition of a boolean variant of the prop.
 * If passed as boolean, this would use the defaultBorder that you've defined in the theme.
 * All border props use the width defined in the theme (or 1px if not provided).
 * If you need a variable width, you should use the regular CSS props approach
 */

border?: PaletteKey | boolean;
borderTop?: PaletteKey | boolean;
borderRight?: PaletteKey | boolean;
borderBottom?: PaletteKey | boolean;
borderLeft?: PaletteKey | boolean;

/**
 * Specifies a radius key from the config to use for that element
 */
radius?: ResponsiveValue<TRadius>;

/**
 * Similarly to the radius, it applies the selected z-index from the theme
 */
zIndex?: keyof TZIndex;

/**
 * The typography key has a similar structure to colors.
 * It's a dot notation key from what you defined in the theme.
 * It would automatically apply all typography styles for the given variant.
 * This is useful if you want to have text inside a div, without adding another DOM child.
 * Most of the times, this won't be needed as the Typography component can be used instead.
 */
typography?: TypographyKey;

/**
 * The following properties are just raw CSS properties exposed as component props for convenience.
 * Their value is not modified in any form, except for responsiveness, where defined
 */

position?: ResponsiveValue<CSSObject["position"]>;
overflow?: CSSObject["overflow"];
minWidth?: ResponsiveValue<CSSObject["minWidth"]>;
width?: ResponsiveValue<CSSObject["width"]>;
maxWidth?: ResponsiveValue<CSSObject["maxWidth"]>;
minHeight?: ResponsiveValue<CSSObject["minHeight"]>;
height?: ResponsiveValue<CSSObject["height"]>;
maxHeight?: ResponsiveValue<CSSObject["maxHeight"]>;
grow?: ResponsiveValue<CSSObject["flexGrow"]>;

// cursor: pointer and userSelect: none are automatically applied for elements with onClick handler provided, so you don't have to pass it for clickable elements
cursor?: CSSObject["cursor"];
```
