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

  return (
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
    />
  );
};

export default WebViewContainer;
