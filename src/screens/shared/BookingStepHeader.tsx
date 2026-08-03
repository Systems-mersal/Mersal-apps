import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "../../components/icons/AppIcon";
import { AppText } from "../../components/typography/AppText";

interface BookingStepHeaderProps {
  step: string;
  title: string;
  onBack: () => void;
}

export function BookingStepHeader({ step, title, onBack }: BookingStepHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-primary px-6 pb-4"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="flex-row items-center justify-between">
        <View className="rounded-full bg-white/15 px-3 py-1.5">
          <AppText variant="caption" className="text-white">
            {step}
          </AppText>
        </View>

        <AppText variant="subtitle" className="flex-1 text-center text-white">
          {title}
        </AppText>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-white/15 active:opacity-70"
        >
          <AppIcon name="chevron-right" size={20} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}
