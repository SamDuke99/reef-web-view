import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import fetchLocationDetails from "@/api/fetchLocationInfo";
import styles from "@/assets/style";

interface LocationButtonProps {
  isDarkMode: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({ isDarkMode }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] = useState<string>("");

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;

      const details = await fetchLocationDetails(
        coords.latitude,
        coords.longitude
      );
      setLocationDetails(details);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Error fetching location. Please try again.");
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(locationDetails);
    alert("Location details copied to clipboard!");
  };
  console.log(isDarkMode);
  return (
    <View>
      <TouchableOpacity onPress={fetchLocation}>
        <MaterialCommunityIcons
          name='map-marker'
          size={30}
          color={isDarkMode ? "#ffffff" : "#000000"}
        />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType='slide'>
        <View
          style={[
            styles.modalContainer,
            isDarkMode && styles.darkModalContainer,
          ]}
        >
          <View
            style={[styles.modalContent, isDarkMode && styles.darkModalContent]}
          >
            <Text style={styles.modalText}>{locationDetails}</Text>
            <Button title='Copy to Clipboard' onPress={copyToClipboard} />
            <Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocationButton;
