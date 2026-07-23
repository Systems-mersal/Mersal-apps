import { LinearGradient } from "expo-linear-gradient";
import { Car } from "lucide-react-native";
import { Text, View } from "react-native";
import { LanguageSelector } from "../../components/common/LanguageSelector/LanguageSelector";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";
import { LoginForm } from "./components/LoginForm";

export function LoginScreen() {
  const { t } = useLocale();

  return (
    <ScreenWrapper className="flex-1 bg-card" edges={["top"]}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="relative items-center pb-10 pt-2"
      >
        <View className="absolute end-4 top-2 z-10">
          <LanguageSelector />
        </View>
        <View className="mb-3 mt-2 h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20">
          <Car size={30} color={colors.white} strokeWidth={1.5} />
        </View>
        <Text className="font-tajawal-black text-2xl text-white">
          {t("common.brand")}
        </Text>
        <Text className="mt-1 font-tajawal text-sm text-white/70">
          {t("login.tagline")}
        </Text>
      </LinearGradient>
      <LoginForm />
    </ScreenWrapper>
  );
}
