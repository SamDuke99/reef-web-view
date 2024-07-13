# React Native Candidate Home Task

## Task Overview

This React Native application integrates a WebView to display the Gravity website and includes additional features like geolocation. The goal is to demonstrate clean code practices, ensure smooth performance, and provide an enhanced user experience.

## Files Overview

### `index.tsx`

The `index.tsx` file serves as the main entry point for the React Native application. It integrates a WebView component to display the Gravity website and incorporates various features such as pull-to-refresh, navigation controls, error handling, and geolocation support. The app also supports dark mode and adjusts its UI based on network connectivity. Developed using TypeScript, the code emphasizes clean, modular practices to ensure smooth performance and a responsive user experience on both Android and iOS platforms.

### `components/NavBar.tsx`

The `NavBar.tsx` component provides navigation controls and UI elements for the React Native application. It includes buttons for navigating backward and forward in the WebView, toggling between light and dark modes, and accessing location-related features. The component dynamically adjusts its appearance based on the application's dark mode status and WebView navigation state.

### `components/LocationButton.tsx`

The `LocationButton.tsx` component facilitates location fetching and interaction within the React Native application. It integrates with Expo's location services to retrieve the user's current coordinates and fetches additional details using a custom API endpoint. The component includes functionality to display location information in a modal, copy details to the clipboard, and adjusts its appearance based on the application's dark mode setting.

### `api/fetchLocationInfo.ts`

The `fetchLocationInfo.ts` file contains the function `fetchLocationDetails` which retrieves location information based on latitude and longitude coordinates. It utilizes the Geoapify API to reverse geocode the coordinates and fetch the corresponding address details. To obtain an API key for Geoapify, visit [Geoapify Projects](https://myprojects.geoapify.com/projects) and create a project.

Once you have your API key, replace the `apiKey` variable in the `fetchLocationDetails` function in this file with your actual API key. This ensures proper functionality of the location fetching feature in your application. Error handling is implemented to manage potential network issues or API errors during the data fetching process.

### `components/LoadingSpinner.tsx`

The `LoadingSpinner.tsx` component provides a spinning animation with a random (food related) emoji displayed, indicating loading activity within the React Native application. It uses React Native's Animated API to animate the rotation of the emoji in a continuous loop. The animation duration and easing are configured for smooth visual feedback. This component enhances user experience by visually indicating ongoing processes such as data loading or operations.

### `components/WebViewContainer.tsx`

The `WebViewContainer.tsx` component encapsulates a WebView instance within the React Native application. It integrates with the Gravity website through the `react-native-webview` library, providing functionalities such as handling navigation state changes, managing WebView errors, and injecting custom JavaScript for dark mode styling. The component also includes a loading spinner while content is loading to enhance user experience. This component plays a crucial role in displaying external web content seamlessly within the application.

### `assets/styles.ts`

The `styles.ts` file contains predefined style constants used throughout the React Native application. It defines styles for containers, web views, loading overlays, error messages, headers, navigation bars, and modals, ensuring consistent visual presentation across different components.
