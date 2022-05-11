import { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";

export const Shakeable = ({
  shake,
  children,
}: {
  shake: boolean;
  children: any;
}) => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const startShake = useCallback(() => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (shake) {
      startShake();
    }
  }, [shake]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnimation }],
      }}
    >
      {children}
    </Animated.View>
  );
};
