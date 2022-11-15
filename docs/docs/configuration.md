---
title: Configuration
sidebar_position: 2
---

The configuration consists of setting up the theme as well as augmenting a few TypeScript interfaces to make all properties type-safe.

## Theme Config

Here is an example o a theme configuration. All aspects are explained below

```ts
export const theme = {
  breakpoint: {
    xs: 0,
    md: 500,
  },
  spacing: 4,
  palette: {
    primary: {
      normal: "#00659e",
    },
    success: {
      normal: "#20B000",
    },
    warning: {
      normal: "#ffe607",
      dark: "#cbb700",
    },
    neutral: {
      "0": "#ffffff",
      "1": "#f5f5f5",
      "3": "#d8d7df",
      "4": "#898896",
      "5": "#666472",
      "6": "#424149",
      "7": "#27262c",
      "8": "#131316",
      "9": "#050505",
    },
  },
  radius: {
    xs: 4,
    md: 6,
    xl: 8,
    circle: "50%",
  },
  zIndex: {
    dropdown: 100,
    modal: 200,
  },
  typography: {
    default: {
      fontFamily: "Mulish",
      fontSize: 12,
      fontWeight: 400,
    },
    body: {
      "1": {
        fontSize: 14,
      },
      "2": {
        fontSize: 12,
      },
      "3": {
        fontSize: 11,
      },
    },
    title: {
      "1": {
        fontSize: 24,
        fontWeight: 700,
      },
      "2": {
        fontSize: 20,
        fontWeight: 600,
      },
      "3": {
        fontSize: 16,
        fontWeight: 600,
      },
      "4": {
        fontSize: 14,
        fontWeight: 600,
      },
      "5": {
        fontSize: 12,
        fontWeight: 600,
      },
    },
    caption: {
      fontSize: 10,
    },
  },
  customThemeProp: 1,
  defaultBorder: "neutral.3",
};
```

There is also a `ThemeConfig` interface that can guide you through the configuration types. At minimum, the theme should contain:

- `breakpoint` - an object consisting of a key (string) and a value (number). The keys defined here will later on be used (in a type-safe way) as values of the responsive properties and the responsive utils. The smallest breakpoint should always be set to 0 to represent the smallest screen size up to the 2nd breakpoint's pixels value
- `spacing` - a simple numeric value to be used as a multiplier of all spacing-related functionalities - margins, paddings, gaps. Using a multiplier might seem unnecessary, but it provides a very consistent UI across all your components. For example, a value of 4 means you will use a system of 4 - 4, 8, 12, 16 and etc to describe your spacings. Fractions can also be used for edge cases (e.g. 0.5 * spacing). Raw string values are also allowed if you need a specific value without using the spacing. This functionality can also be skipped by setting it to 1, but we do not recommend it.
- `palette` - the palette describes the colors to be used within the app. The structure is completely free. You can either use a flat list or a x-levels nested structure. The keys are later on used when referencing color values. If using a flat structure, the key to use for referencing colors would be the same as the property name. If using a nested structure, a dot notation is later on used - e.g. `primary.normal`
- `typography` - defining your typography styles is crucial for consistency. As with the colors, the structure here is completely up to you with the exception of the `default` property, which contains the base typography styles. All other styles inherit from it, so you don't you can omit the repeating styles (like for example the font-family) and only override what's different
- `radius` - defines a list of accepted border radiuses to use in the app. As with the previous configs, the keys of the object are later used as property values. The values can be both numbers or strings (e.g. percentage, vw or any other CSS-accepted value)
- `zIndex` - defines a list of accepted zIndexes. Defining those in a common place reduces the risks of getting bugs with overlapping contents in your app. We recommend using a slight interval (10/100) to allow adding additional values later on.
- `defaultBorder` - often times the border that you would use in your app would be the same color. Defining a color token here would remove the need of specifying the color manually every time you need a default border
- `...customThemeProp` - you can add any other property to the theme as you would do with the regular emotion theme and that would be available in the theme object when using the `css` property or `useTheme`

## Types Augmentation

Unfortunately, the types cannot work automagically, so a bit of help is needed on your side. There are 6 interfaces that need to be augmented to fit your theme. The example below is basically ready to copy-paste and it's fully based on the theme object that you've already defined

```ts
type Breakpoint = typeof theme.breakpoint;
type Typography = typeof theme.typography;
type ZIndex = typeof theme.zIndex;
type Palette = typeof theme.palette;
type Radius = typeof theme.radius;

type CustomProps = Omit<
  typeof theme,
  "breakpoint" | "spacing" | "palette" | "radius" | "zIndex" | "typography" | "defaultBorder"
>;

declare module "e-prim" {
  export interface TBreakpoint extends Breakpoint {}
  export interface TPalette extends Palette {}
  export interface TRadius extends Radius {}
  export interface TZIndex extends ZIndex {}
  export interface TTypography extends Typography {}
  export interface TCustomProps extends CustomProps {}
}
```

## Theme Provider

The last step is to pass the configured theme to the `ThemeProvider` exposed by `e-prim`. It's basically a wrapper around emotion-s `ThemeProvider`, giving some typings around theme config as well as providing the option to add functionality to the library in future (like automatic theme switcher for example). You can totally use emotion's `ThemeProvider` if you like, but that's not recommended.

```tsx
<ThemeProvider theme={theme}>
  ...rest of your app
</ThemeProvider>
```
