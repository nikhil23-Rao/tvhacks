import "font-awesome/css/font-awesome.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={false}>
    <>
      <Component {...pageProps} />
      <script
        async
        src="https://cse.google.com/cse.js?cx=a4f4b5764b60b450b"
      ></script></>
    </ChakraProvider>
  );
}
