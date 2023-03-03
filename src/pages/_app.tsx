import type { AppProps } from 'next/app';
import { DebugProvider } from 'context';
import { GlobalStyle } from 'styles';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <DebugProvider>
        <Component {...pageProps} />
      </DebugProvider>
    </>
  );
}
