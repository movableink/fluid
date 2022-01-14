# fluid [![CI](https://github.com/movableink/fluid/actions/workflows/ci.yml/badge.svg)](https://github.com/movableink/fluid/actions/workflows/ci.yml)

> A Design Framework for fluid & reactive interfaces

## Installation

1. Ensure you have [`volta`](https://volta.sh) installed on your computer
2. Clone the repo
3. `yarn install`

## Local Development

### Storybook

Storybook provides a useful way to develop components and document their usage. It requires that both the Ember CLI _and_ Storybook servers are running at the same time. You can do that by running

```sh
yarn run-p start storybook
```

Once the Ember CLI build completes, Storybook should be ready to go!

### Testing

The tests can be run in an interactive browser

```sh
yarn ember test --serve
```

## License

Copyright Movable, Inc.
