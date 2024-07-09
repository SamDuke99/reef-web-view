import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, Animated, Easing } from "react-native";

const emojis = ["🍔", "🍕", "🍟", "🥙"];

export default function LoadingSpinner() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [emoji, setEmoji] = useState(emojis[0]);

  useEffect(() => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);

    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emoji: {
    fontSize: 50,
  },
});
