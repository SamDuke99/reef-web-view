import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationButton from "./LocationButton";
import * as Location from "expo-location";

interface NavBarProps {
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  goBack,
  goForward,
  canGoBack,
  canGoForward,
}) => {
  const handleLocationFetched = (location: Location.LocationObjectCoords) => {
    alert(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={goBack} disabled={!canGoBack}>
        <MaterialCommunityIcons
          name='chevron-left'
          size={30}
          color={!canGoBack ? "#ccc" : "#000"}
        />
      </TouchableOpacity>
      <LocationButton onLocationFetched={handleLocationFetched} />
      <TouchableOpacity onPress={goForward} disabled={!canGoForward}>
        <MaterialCommunityIcons
          name='chevron-right'
          size={30}
          color={!canGoForward ? "#ccc" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#e7e7e7",
  },
});

export default NavBar;
