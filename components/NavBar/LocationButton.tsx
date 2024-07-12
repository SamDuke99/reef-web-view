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

const LocationButton: React.FC = () => {
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

  return (
    <View>
      <TouchableOpacity onPress={fetchLocation}>
        <MaterialCommunityIcons name='map-marker' size={30} color={"#000"} />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{locationDetails}</Text>
            <Button title='Copy to Clipboard' onPress={copyToClipboard} />
            <Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
});

export default LocationButton;
