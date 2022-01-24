# fluid [![CI](https://github.com/movableink/fluid/actions/workflows/ci.yml/badge.svg)](https://github.com/movableink/fluid/actions/workflows/ci.yml)

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

```
yarn start
```

We use [docfy](https://docfy.dev/docs) for all our documenation. The local server is accessible via http://localhost:9999

### Testing

The tests can be run in an interactive browser

```sh
yarn ember test --serve
```
