import { Text, View } from "react-native";
import { useLocale } from "../../../localization/i18n";

export function OrDivider() {
  const { t } = useLocale();

  return (
    <View className="my-4 flex-row items-center gap-3">
      <View className="h-px flex-1 bg-border" />
      <Text className="font-tajawal text-xs text-muted-foreground">
        {t("common.or")}
      </Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
