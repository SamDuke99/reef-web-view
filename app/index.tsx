import React, { useRef, useState } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import NavBar from "@/components/NavBar/NavBar";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function App() {
  const webViewRef = useRef<WebView | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);

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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
