# Releases

Our releases are managed by [release-it](https://github.com/release-it/release-it). And uses [conventional-commits] to auto generate our sematic versions and change logs. Check out how the release actually works here [release-it.yml](.github/workflows/release-it.yml)

## FAQs

1. Why didn't my changes get released?
   - Did you make changes to package concerned files?
     - *js, *hbs, public/\*_/_
   - Did all checks pass?
2. How do I do a manual release?
   1. go to https://github.com/movableink/fluid/actions/workflows/release-it.yml
   2. click `run workflow`
      - default branch is main
      - if you need to do a release from a different branch please reach out to #shiba in slack for additional help
3. What about storybook?
   - Storybook documenation is handled by a different workflow and has seperate requirements for how the docs are deployed to https://movableink.github.io/fluid
