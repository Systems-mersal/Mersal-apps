import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Car } from "lucide-react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

export function SplashScreen() {
  const router = useRouter();
  const { t } = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2600);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={[
        colors.primary,
        colors.primaryLight,
        colors.primaryDark,
        "#1A7FC4",
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="flex-1 items-center justify-center"
    >
      <View className="items-center gap-4">
        <View className="h-24 w-24 items-center justify-center rounded-3xl border border-white/30 bg-white/20">
          <Car size={48} color={colors.white} strokeWidth={1.5} />
        </View>
        <View className="items-center">
          <Text className="font-tajawal-black text-5xl tracking-wider text-white">
            {t("common.brand")}
          </Text>
          <Text className="mt-1.5 font-tajawal-medium text-sm text-white/70">
            {t("common.brandSubtitle")}
          </Text>
        </View>
      </View>

      <View className="absolute bottom-16 flex-row gap-2.5">
        {[0, 1, 2].map((dot) => (
          <View key={dot} className="h-2 w-2 rounded-full bg-white" />
        ))}
      </View>

      <Text className="absolute bottom-7 font-tajawal-medium text-xs text-white/50">
        {t("login.poweredBy")}
      </Text>
    </LinearGradient>
  );
}
