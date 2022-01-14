import { isEqual } from '@ember/utils';
import { get, computed } from '@ember/object';

export default function (lhs, rhs) {
  return computed(lhs, rhs, {
    get() {
      return isEqual(get(this, lhs), get(this, rhs));
    },
  });
}
