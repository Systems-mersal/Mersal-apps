import React from "react";
import { ScrollView, View, type ScrollViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

export function Screen({
  children,
  scrollable = true,
  className = "",
  contentClassName = "",
  edges = ["left", "right", "bottom"],
  ...scrollProps
}: ScreenProps) {
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName={`flex-grow px-4 pb-6 ${contentClassName}`}
      {...scrollProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 px-4 ${contentClassName}`}>{children}</View>
  );

  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-background ${className}`}>
      {content}
    </SafeAreaView>
  );
}
