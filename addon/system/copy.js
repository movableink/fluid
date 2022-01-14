import RSVP from 'rsvp';
import Ember from 'ember';

const globalClipboard =
  typeof ClipboardEvent === 'undefined' &&
  typeof window.clipboardData !== 'undefined' &&
  typeof window.clipboardData.setData !== 'undefined';
// For testing
const Clipboard = {};

// Copy for Internet Explorer;
// It has a global clipboard that we can insert data into
function msCopy(text) {
  Clipboard.text = text;
  return new RSVP.Promise(function (resolve, reject) {
    if (window.clipboardData.setData('Text', text)) {
      resolve();
    } else {
      reject(new Error('Copying was rejected.'));
    }
  });
}

if (!globalClipboard) {
  var _intercept = false;
  var _text;

  document.addEventListener('copy', function (e) {
    if (_intercept) {
      _intercept = false;
      e.clipboardData.setData('text/plain', _text);
      e.preventDefault();
    }
  });
}

// The current standard browsers (except for Safari)
// require calling execCommand to copy text
function standardsCopy(text) {
  return new RSVP.Promise(function (resolve, reject) {
    _intercept = true;
    _text = text;
    Clipboard.text = text;

    if (Ember.testing) {
      return Clipboard.fail ? reject() : resolve();
    }

    try {
      if (document.execCommand('copy')) {
        // document.execCommand is synchronous: http://www.w3.org/TR/2015/WD-clipboard-apis-20150421/#integration-with-rich-text-editing-apis
        // So we can call resolve() back here.
        resolve();
      } else {
        _intercept = false;
        reject(new Error("Unable to copy. Perhaps it's not available in your browser?"));
      }
    } catch (e) {
      _intercept = false;
      reject(e);
    }
  }, 'copying ' + text.slice(0, 25));
}

export { Clipboard };
export default globalClipboard ? msCopy : standardsCopy;
