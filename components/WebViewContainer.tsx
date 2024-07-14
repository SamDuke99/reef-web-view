import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import {
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "@/assets/style";

interface WebViewContainerProps {
  isDarkMode: boolean;
  handleNavigationStateChange: (navState: WebViewNavigation) => void;
  handleError: (error: string) => void;
  reloadWebView: () => void;
  webViewRef: React.RefObject<WebView>;
}

const WebViewContainer: React.FC<WebViewContainerProps> = ({
  isDarkMode,
  handleNavigationStateChange,
  handleError,
  reloadWebView,
  webViewRef,
}) => {
  const [webViewError, setWebViewError] = useState<string | null>(null);

  const handleWebViewError = (syntheticEvent: WebViewErrorEvent) => {
    const { description } = syntheticEvent.nativeEvent;
    handleError(description);
    setWebViewError(description);
  };

  const handleHttpError = (syntheticEvent: WebViewHttpErrorEvent) => {
    const { statusCode } = syntheticEvent.nativeEvent;
    if (statusCode >= 400) {
      const errorMessage = `HTTP error ${statusCode}`;
      handleError(errorMessage);
      setWebViewError(errorMessage);
    }
  };

  const darkModeCSS = `
    body, html, div, p, a, span, h1, h2, h3, h4, h5, h6, header, footer, section, article, aside, main, nav, figure, figcaption {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
    }
    a {
      color: #bb86fc !important;
    }
    .container-fluid.fixed-top.bg-white, .lh-1.py-3.px-3 {
      background-color: #121212 !important;
    }
  `;

  const lightModeCSS = `
    body, html, div, p, a, span, h1, h2, h3, h4, h5, h6, header, footer, section, article, aside, main, nav, figure, figcaption {
      background-color: #ffffff !important;
      color: #000000 !important;
    }
    a {
      color: #0000ff !important;
    }
  `;

  const injectCSS = (css: string) => `
    (function() {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(\`${css}\`));
      document.head.appendChild(style);
      window.ReactNativeWebView.postMessage('CSS injected');
    })();
  `;

  return (
    <>
      {webViewError ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, isDarkMode && styles.darkText]}>
            {webViewError}
          </Text>
          <Button title='Retry' onPress={reloadWebView} />
        </View>
      ) : (
        <WebView
          ref={webViewRef}
          style={styles.webView}
          source={{ uri: "https://gravity.getreef.com/warrington?locale=en" }}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingOverlay}>
              <LoadingSpinner />
            </View>
          )}
          onNavigationStateChange={handleNavigationStateChange}
          onError={handleWebViewError}
          onHttpError={handleHttpError}
          injectedJavaScript={injectCSS(
            isDarkMode ? darkModeCSS : lightModeCSS
          )}
          onMessage={(event) => console.log(event.nativeEvent.data)}
        />
      )}
    </>
  );
};

export default WebViewContainer;
