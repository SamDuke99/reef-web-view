import styles from "@/assets/style";
import React from "react";
import { View, Text, Button } from "react-native";

interface ErrorComponentProps {
  error: string;
  reloadWebView: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  reloadWebView,
}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Button title='Retry' onPress={reloadWebView} />
    </View>
  );
};

export default ErrorComponent;
