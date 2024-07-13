import React from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import { View } from "react-native";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";
import styles from "@/assets/style";

interface WebViewContainerProps {
  webViewRef: React.RefObject<WebView>;
  setCanGoBack: (canGoBack: boolean) => void;
  setCanGoForward: (canGoForward: boolean) => void;
  setWebViewError: (error: string | null) => void;
}

const WebViewContainer: React.FC<WebViewContainerProps> = ({
  webViewRef,
  setCanGoBack,
  setCanGoForward,
  setWebViewError,
}) => {
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const handleWebViewError = (syntheticEvent: WebViewErrorEvent) => {
    const { description } = syntheticEvent.nativeEvent;
    setWebViewError(description);
  };

  const handleHttpError = (syntheticEvent: WebViewHttpErrorEvent) => {
    const { statusCode } = syntheticEvent.nativeEvent;
    if (statusCode >= 400) {
      setWebViewError(`HTTP error ${statusCode}`);
    }
  };

  const onMessage = (event: any) => {
    console.log(event.nativeEvent.data);
  };

  const darkModeCSS = `
    body, html, div, p, a, span, h1, h2, h3, h4, h5, h6, header, footer, section, article, aside, main, nav, figure, figcaption {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
    }

    a {
      color: #bb86fc !important;
    }

    /* Add more styles as needed */
  `;

  const injectDarkModeCSS = `
    (function() {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(\`${darkModeCSS}\`));
      document.head.appendChild(style);
      window.ReactNativeWebView.postMessage('Dark mode CSS injected');
    })();
  `;

  return (
    <WebView
      ref={webViewRef}
      style={styles.webView}
      source={{
        uri: "https://gravity.getreef.com/warrington?locale=en",
      }}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.loadingOverlay}>
          <LoadingSpinner />
        </View>
      )}
      onNavigationStateChange={handleNavigationStateChange}
      onError={handleWebViewError}
      onHttpError={handleHttpError}
      injectedJavaScript={injectDarkModeCSS}
      onMessage={onMessage}
    />
  );
};

export default WebViewContainer;
