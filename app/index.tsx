import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
  Platform,
} from "react-native";
import NavBar from "@/components/NavBar/NavBar";
import { useNetInfo } from "@react-native-community/netinfo";
import Offline from "./offline";
import styles from "@/assets/style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import WebViewContainer from "@/components/WebViewContainer";
import { WebView } from "react-native-webview";
import { WebViewNavigation } from "react-native-webview";

export default function App() {
  const webViewRef = useRef<WebView | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoForward, setCanGoForward] = useState<boolean>(false);
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
    console.error(error);
  };

  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, isDarkMode ? styles.darkSafeArea : null]}
      >
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={isDarkMode ? "#121212" : "#ffffff"}
        />
        <View
          style={[styles.container, isDarkMode ? styles.darkContainer : null]}
        >
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {netInfo.isConnected ? (
              <WebViewContainer
                isDarkMode={isDarkMode}
                handleNavigationStateChange={handleNavigationStateChange}
                handleError={handleError}
                reloadWebView={reloadWebView}
                webViewRef={webViewRef}
              />
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
