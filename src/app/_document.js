// app/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add any additional <head> tags here if necessary */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}