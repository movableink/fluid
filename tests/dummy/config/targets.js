'use strict';

/**
 * Our stated Browser support policy is "last 2 versions of ever-green browsers"
 *
 * https://browserslist.dev/?q=bGFzdCAyIENocm9tZSB2ZXJzaW9ucywgbGFzdCAyIFNhZmFyaSBtYWpvciB2ZXJzaW9ucywgbGFzdCAyIEZpcmVGb3ggbWFqb3IgdmVyc2lvbnMsIGxhc3QgMiBFZGdlIG1ham9yIHZlcnNpb25z
 */
const production = [
  'last 2 Chrome major versions',
  'last 2 FireFox major versions',
  'last 2 Safari major versions',
  'last 2 Edge major versions',
];

const development = ['last 1 Chrome versions', 'last 1 Firefox versions', 'last 1 Safari versions'];

const testing = ['last 1 Chrome versions'];

const isCI = Boolean(process.env.CI);
const isTesting = isCI || process.env.EMBER_ENV === 'test';
const isProduction = process.env.EMBER_ENV === 'production';

let browsers;

if (isProduction) {
  browsers = production;
} else if (isTesting) {
  browsers = testing;
} else {
  browsers = development;
}

module.exports = {
  browsers,
};
