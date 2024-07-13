import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  Button,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import NavBar from "@/components/NavBar/NavBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useNetInfo } from "@react-native-community/netinfo";
import Offline from "./offline";
import {
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from "react-native-webview/lib/WebViewTypes";
import styles from "@/assets/style";

export default function App() {
  const webViewRef = useRef<WebView | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const netInfo = useNetInfo();

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(isDarkMode ? "#121212" : "#ffffff");
    }
  }, [isDarkMode]);

  const onRefresh = () => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const goBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleError = (error: string) => {
    setWebViewError(error);
  };

  const handleWebViewError = (syntheticEvent: WebViewErrorEvent) => {
    const { description } = syntheticEvent.nativeEvent;
    handleError(description);
  };

  const handleHttpError = (syntheticEvent: WebViewHttpErrorEvent) => {
    const { statusCode } = syntheticEvent.nativeEvent;
    if (statusCode >= 400) {
      handleError(`HTTP error ${statusCode}`);
    }
  };

  const reloadWebView = () => {
    setWebViewError(null);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const refreshWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
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
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {netInfo.isConnected ? (
          webViewError ? (
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
              injectedJavaScript={injectCSS(
                isDarkMode ? darkModeCSS : lightModeCSS
              )}
              onMessage={(event) => console.log(event.nativeEvent.data)}
            />
          )
        ) : (
          <Offline />
        )}
      </ScrollView>
      <NavBar
        goBack={goBack}
        goForward={goForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        refreshWebView={reloadWebView}
      />
    </View>
  );
}
