import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

interface LocationButtonProps {
  onLocationFetched: (location: Location.LocationObjectCoords) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  onLocationFetched,
}) => {
  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      onLocationFetched(location.coords);
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Error fetching location. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={fetchLocation}>
      <MaterialCommunityIcons name='map-marker' size={30} color={"#000"} />
    </TouchableOpacity>
  );
};

export default LocationButton;
