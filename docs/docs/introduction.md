---
title: Introduction
sidebar_position: 1
slug: /
---

e-prim (short from emotion-primitives) is a small abstraction on top of [emotion](https://emotion.sh/) that aims to provide a set of primitives to help you prototype UI faster. It can also be referred to as a core of a design system. It is a good foundation for building your own component libraries or use in any project of course.

The main focus is type-safety, so every aspect of the library is strongly typed.

The library consists of the following parts:

- A theme guideline - in order for the primitives to work, we need to have at least a basic structure of the theme (reusing the [emotion theme](https://emotion.sh/docs/theming)). While maintaining some guidelines, the theme is pretty generic, so you should be able to use the structure that you like
- A style system that exposes common props as properties on the components. This is not used directly, but rather as part of the built-in components
- Primitive/core components - box, typography, flex, grid - a set of components that can be used directly in the project. More on that is explained with examples

Install the library using either npm or yarn: `npm install e-prim` or `yarn add e-prim`.

You can run the example NextJS app and play with the library - [example](https://github.com/dstoyanoff/e-prim/tree/main/example)
