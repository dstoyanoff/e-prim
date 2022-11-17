---
title: Theme Utils
sidebar_position: 3
---

When configuring the emotion theme, `e-prim` automatically adds a few utils to the theme. You will have those available everywhere you use the theme (`useTheme` hook, `css` prop, `styled`)

Here is the list of utils that are configured for the theme:

## mediaUp/mediaDown

`mediaUp/mediaDown (breakpoint: keyof TBreakpoint)`

You can use those functions to generate a media query based on the breakpoints in your theme. This is usually useful as part of `css` prop or `styled` if you want a specific responsive value that's not available using the box system. Example:

```tsx
// given
<Box
  css={({ mediaUp }) => ({
    width: 100,
    height: 100,
    [mediaUp("md")]: {
      width: "100%"
    },
    [mediaDown("md")]: {
      height: "100%"
    }
  })}
/>

// you get
{
  width: "100px",
  height: "100px",
  "@media (min-width: 500px)": {
    width: "100%"
  },
  "@media (max-width: 500px)": {
    height: "100%"
  }
}
```

## spacing

`spacing(...SpacingUnit)`

The spacing util is the same one that you can use in the box system (margins/paddings/gaps). It's actually what's used under the hood in the box. You can pass 1-4 parameters in either a string or numeric form. If the value is a number, it would automatically be converted to pixels. Apart from that, it works exactly like you would expect it in the CSS margin/padding syntax.

```tsx
<Box
  css={({ spacing }) => ({
    marginLeft: spacing(10), // 40px
    marginTop: "10%",
    marginBottom: "5vh"
  })}
/>
```

## transparentColor

`transparentColor(key: PaletteKey, opacity: number)`

The transparent color util takes a key from your palette as well as a transparency value. Based on that, it resolves the color, tries to get it's type (hex, rgb, hsl) and applies the provided opacity. Opacity is interpreted as a percentage (0 - 100);

## colorByKey

`colorByKey(key: PaletteColor)`

Resolves the color value given a palette key from your theme configuration

```tsx
<Box
  css={({ colorByKey }) => ({
    color: colorByKey("neutral.0")
  })}
/>
```
