import { PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenWrapperProps = PropsWithChildren<{
  className?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
  withSafeArea?: boolean;
}>;

export function ScreenWrapper({
  children,
  className = "flex-1 bg-background",
  edges = ["top"],
  withSafeArea = true,
}: ScreenWrapperProps) {
  if (!withSafeArea) {
    return <View className={className}>{children}</View>;
  }

  return (
    <SafeAreaView edges={edges} className={className}>
      {children}
    </SafeAreaView>
  );
}
