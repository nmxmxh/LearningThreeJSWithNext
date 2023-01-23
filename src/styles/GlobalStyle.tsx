import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    border: 0;
    outline: none;
    box-sizing: border-box;
    scroll-behavior: smooth;

    // remove blue highlight that renders over interactable elements when they
    // are tapped

    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a, button {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: white;
    transition: background-color 0.25s linear;
    width: 100%;

    // targeting the div created by Next.js, setting with to 100vw and cutting off overflow
    div#__next {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-x: hidden;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: black;
   }
`;

export default GlobalStyle;
