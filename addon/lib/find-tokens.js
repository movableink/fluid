export const tokenRegex = /\[([\w\d-]+)\]/g;

export default (text) => {
  if (!text) {
    text = '';
  }

  const tokens = text.match(tokenRegex) || [];
  return tokens.map((token) => token.replace(tokenRegex, '$1'));
};
