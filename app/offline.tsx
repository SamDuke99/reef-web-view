import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "@/assets/style";

const Offline = () => {
  return (
    <View style={styles.offlineContainer}>
      <MaterialIcons name='error' size={100} color='#000000' />
      <Text style={styles.offlineText}>
        Oops! It looks like you're offline. Please check your connection and try
        again.
      </Text>
    </View>
  );
};

export default Offline;
