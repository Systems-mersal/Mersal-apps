import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocale } from "../../../localization/i18n";
import { colors } from "../../../theme";

type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  light?: boolean;
};

export function AppHeader({ title, onBack, right, light = false }: AppHeaderProps) {
  const { isRTL } = useLocale();
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;
  const iconColor = light ? colors.white : colors.foreground;

  return (
    <View className="h-[52px] flex-row items-center justify-between px-4">
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          className={`h-8 w-8 items-center justify-center rounded-full ${
            light ? "bg-white/20" : "bg-muted"
          }`}
        >
          <BackIcon size={18} color={iconColor} />
        </Pressable>
      ) : (
        <View className="h-8 w-8" />
      )}
      <Text
        className={`font-tajawal-black text-base ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </Text>
      <View className="h-8 w-8 items-center justify-center">{right}</View>
    </View>
  );
}
