# fluid [![CI](https://github.com/movableink/fluid/actions/workflows/ci.yml/badge.svg)](https://github.com/movableink/fluid/actions/workflows/ci.yml) ![Percy](https://percy.io/static/images/percy-badge.svg)

Fluid is [@movableink's](https://github.com/movableink) design system. We use a combination of emberjs, and tailwind to build our design system. The TailwindCss config docs can be found at [@movable/tailwind-config](https://movableink.github.io/tailwind-config)

## Installation

This currently is an `ember-addon` and should be installed as such:

```
ember install @movable/fluid
```

## Local Development

### Installation

1. Ensure you have [`volta`](https://volta.sh) installed on your computer
2. Clone the repo
3. `yarn install`

### Server

The documentation server can be run locally by running:

```sh
yarn storybook-dev
```

We use [Storybook](https://storybook.js.org/docs/react/get-started/introduction) for all our documenation. The local server is accessible via http://localhost:9001

### Testing

The tests can be run in an interactive browser

```sh
yarn test
```
