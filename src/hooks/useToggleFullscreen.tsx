import useWindowAndDocument from './useWindowAndDocument';

interface FullscreenDocument extends Document {
  mozFullScreenElement?: Element;
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;

  mozCancelFullScreen?: Promise<void>;
  webkitExitFullscreen?: Promise<void>;
  msExitFullscreen?: Promise<void>;
}

interface DocumentElement extends HTMLElement {
  mozRequestFullScreen?: Promise<void>;
  webkitRequestFullScreen?: Promise<void>;
  msRequestFullscreen?: Promise<void>;
}

export default function useToggleFullScreen() {
  const { _window } = useWindowAndDocument();

  function toggleFullscreen() {
    if (_window) {
      const doc: FullscreenDocument = window.document;
      const docEl: DocumentElement = doc.documentElement;

      const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;
      const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }
    }
  }

  return toggleFullscreen;
}
