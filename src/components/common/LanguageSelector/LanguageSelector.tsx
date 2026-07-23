import { Languages } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { useLocale } from "../../../localization/i18n";
import { colors } from "../../../theme";

export function LanguageSelector() {
  const { locale, toggleLocale } = useLocale();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={toggleLocale}
      className="flex-row items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2"
    >
      <Languages size={14} color={colors.white} />
      <Text className="font-tajawal-bold text-sm text-white">
        {locale === "ar" ? "EN" : "AR"}
      </Text>
    </Pressable>
  );
}
