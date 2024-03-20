// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

// _app.js

import Head from "next/head.js";
import Header from "../components/Header.js";
import { ThemeProvider } from "../context/ThemeContextProvider.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script.js";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        ></link>
      </Head>
      <Header />
      <Component {...pageProps} />

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
      ></Script>
    </ThemeProvider>
  );
}

export default MyApp;

// _app.js

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Header from "../components/Header";
// import { ThemeProvider } from "../context/ThemeContextProvider";

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       // Ensure smooth scrolling when navigating between pages
//       document.querySelector("html").scrollIntoView({ behavior: "smooth" });
//     };

//     router.events.on("routeChangeComplete", handleRouteChange);

//     // Remove event listener on component unmount
//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router]);

//   return (
//     <ThemeProvider>
//       <Head>
//         <link
//           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
//           rel="stylesheet"
//           integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
//           crossOrigin="anonymous" // Changed from 'crossorigin' to 'crossOrigin'
//         />
//       </Head>
//       <Header />
//       <Component {...pageProps} />
//     </ThemeProvider>
//   );
// }

// export default MyApp;
