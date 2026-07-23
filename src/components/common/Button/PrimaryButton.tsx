import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  icon?: ReactNode;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  className = "",
  icon,
}: PrimaryButtonProps) {
  const isOutline = variant === "outline";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`min-h-[56px] items-center justify-center rounded-2xl px-4 active:scale-[0.98] ${
        isOutline
          ? "border-2 border-border bg-transparent"
          : "bg-primary shadow-primary"
      } ${className}`}
    >
      <View className="flex-row items-center justify-center gap-2">
        {icon}
        <Text
          className={`font-tajawal-bold text-base ${
            isOutline ? "text-foreground" : "text-primary-foreground"
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
