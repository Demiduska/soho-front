import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "../components/common/layout";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <GoogleReCaptchaProvider
        reCaptchaKey={"6LcSTlwlAAAAAJ4OyacZqBZ5YJ6alNfby6RGvrNU"}
        scriptProps={{
          async: false, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined,
        }}
      >
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </GoogleReCaptchaProvider>
    </Provider>
  );
}

export default MyApp;
