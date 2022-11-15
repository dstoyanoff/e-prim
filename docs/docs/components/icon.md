---
title: Icon
sidebar_position: 5
---

In most projects, there is a library of icons that's used across all parts of the app. Usually (with exceptions for course) the library consists of monochrome square icons. That means that the icons always have 1:1 aspect ratio, the same viewbox size and etc. Creating all those icons one by one is very verbose.

To solve that, the Icon component serves as a basic wrapper for your SVGs, while you only focus on their content.

An example of your specific icon component would look like this. If your SVG consists of multiple elements in the root, you can use react fragment to wrap them.

```tsx
export const ArrowIcon: FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M4 12H20M20 12L12 4M20 12L12 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);
```

When creating an icon, it's important to pay attention at 2 important things:

1. All colors need to be passed as `currentColor`. This ensures that your icon will inherit the colors from it's parent (by using the `color` prop of the icon)
2. The configured SVG is assumed to be 24px. It's easier if you can maintain your library in a single size. If that's not an option, the BaseIcon component accepts a property `viewBoxSize` which instructs it what's the original size of your SVG

And it's usage would look like this:

```tsx
<ArrowIcon color="neutral.0" size={32} />
```

## API

Apart from all SVG props as well as all box props, the icon API exposes:

```ts
/**
 * This is the size of the icon that you wish to render in a specific scenario.
 * If not provided, it defaults to the configured default of 24
 */
size?: number;
```
