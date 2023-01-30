import { useWindowAndDocument } from "hooks";

export default function useRequestFullscreen() {
  const { _document } = useWindowAndDocument();

  function requestFullScreen() {
    if (_document) {
      if (document.fullscreenElement === null) {
        document.body.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }

  return requestFullScreen;
};