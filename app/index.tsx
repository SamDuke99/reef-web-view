import React, { useRef, useState } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { WebView } from "react-native-webview";
import { useNetInfo } from "@react-native-community/netinfo";
import NavBar from "@/components/NavBar/NavBar";
import styles from "@/assets/style";
import ErrorComponent from "@/components/NavBar/ErrorComponent";
import WebViewContainer from "@/components/WebViewContainer";
import Offline from "./offline";
export default function App() {
  const webViewRef = useRef<WebView | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);

  const netInfo = useNetInfo();

  const onRefresh = () => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => setRefreshing(false), 1000);
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

  const reloadWebView = () => {
    setWebViewError(null);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {netInfo.isConnected ? (
          webViewError ? (
            <ErrorComponent
              error={webViewError}
              reloadWebView={reloadWebView}
            />
          ) : (
            <WebViewContainer
              webViewRef={webViewRef}
              setCanGoBack={setCanGoBack}
              setCanGoForward={setCanGoForward}
              setWebViewError={setWebViewError}
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
      />
    </View>
  );
}
