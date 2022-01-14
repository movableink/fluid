export default function (callback) {
  const fn = function (...args) {
    fn.calledWith = args;
    fn.called++;
    if (callback) {
      return callback.apply(this, args);
    }
  };
  fn.called = 0;
  return fn;
}
