import { ThemeProvider } from "e-prim";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles";
import { theme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
