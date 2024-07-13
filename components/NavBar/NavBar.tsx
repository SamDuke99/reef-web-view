// components/NavBar.tsx

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationButton from "./LocationButton";
import styles from "@/assets/style";

interface NavBarProps {
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  refreshWebView: () => void;
  style?: any;
}

const NavBar: React.FC<NavBarProps> = ({
  goBack,
  goForward,
  canGoBack,
  canGoForward,
  toggleDarkMode,
  isDarkMode,
  refreshWebView,
  style,
}) => {
  const handleToggleDarkMode = () => {
    toggleDarkMode();
    refreshWebView();
  };

  return (
    <View style={[styles.navBar, isDarkMode ? styles.darkNavBar : null, style]}>
      <TouchableOpacity onPress={goBack} disabled={!canGoBack}>
        <MaterialCommunityIcons
          name='chevron-left'
          size={30}
          color={!canGoBack ? "#ccc" : isDarkMode ? "#ffffff" : "#000000"}
        />
      </TouchableOpacity>
      <LocationButton isDarkMode={isDarkMode} />
      <TouchableOpacity onPress={handleToggleDarkMode}>
        <MaterialCommunityIcons
          name={isDarkMode ? "lightbulb-off" : "lightbulb"}
          size={30}
          color={isDarkMode ? "#ffffff" : "#000000"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={goForward} disabled={!canGoForward}>
        <MaterialCommunityIcons
          name='chevron-right'
          size={30}
          color={!canGoForward ? "#ccc" : isDarkMode ? "#ffffff" : "#000000"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
