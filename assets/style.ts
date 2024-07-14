import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  darkSafeArea: {
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  darkContainer: {
    backgroundColor: "#121212",
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#000000",
  },
  darkText: {
    color: "#e0e0e0",
  },
  header: {
    backgroundColor: "#f8f8f8",
    borderColor: "#e7e7e7",
    borderTopWidth: 1,
  },
  darkHeader: {
    backgroundColor: "#121212",
    borderColor: "#1a1a1a",
    borderTopWidth: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#e7e7e7",
  },
  darkNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderColor: "#1a1a1a",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  darkModalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  darkModalContent: {
    backgroundColor: "#333333",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  offlineContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  offlineText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#000000",
  },
});

export default styles;
