import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Heart,
  Languages,
  LogOut,
  Shield,
  UserRound,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

export function ProfileScreen() {
  const router = useRouter();
  const { t, locale, toggleLocale, isRTL } = useLocale();
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const rows = [
    {
      key: "favorites",
      label: t("profile.favorites"),
      icon: Heart,
      onPress: () => router.push("/favorites"),
    },
    {
      key: "language",
      label: `${t("profile.language")} · ${locale.toUpperCase()}`,
      icon: Languages,
      onPress: toggleLocale,
    },
    {
      key: "help",
      label: t("profile.help"),
      icon: CircleHelp,
      onPress: () => undefined,
    },
    {
      key: "terms",
      label: t("profile.terms"),
      icon: Shield,
      onPress: () => undefined,
    },
  ];

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="px-4 pb-3 pt-2">
        <Text className="text-end font-tajawal-black text-xl text-foreground">
          {t("profile.title")}
        </Text>
      </View>

      <View className="mx-4 mb-4 items-center rounded-2xl bg-card px-4 py-6 shadow-card">
        <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <UserRound size={28} color={colors.primary} />
        </View>
        <Text className="font-tajawal-black text-lg text-foreground">
          {t("profile.guest")}
        </Text>
        <Pressable className="mt-2">
          <Text className="font-tajawal-bold text-sm text-primary">
            {t("profile.editProfile")}
          </Text>
        </Pressable>
      </View>

      <View className="mx-4 overflow-hidden rounded-2xl bg-card shadow-card">
        {rows.map((row, index) => {
          const Icon = row.icon;
          return (
            <Pressable
              key={row.key}
              onPress={row.onPress}
              className={`flex-row items-center gap-3 px-4 py-4 ${
                index < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Chevron size={16} color={colors.mutedForeground} />
              <Text className="flex-1 text-end font-tajawal-bold text-sm text-foreground">
                {row.label}
              </Text>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-secondary">
                <Icon size={16} color={colors.primary} />
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => router.replace("/login")}
        className="mx-4 mt-4 flex-row items-center justify-center gap-2 rounded-2xl bg-card px-4 py-4 shadow-card"
      >
        <LogOut size={16} color={colors.destructive} />
        <Text className="font-tajawal-bold text-sm text-destructive">
          {t("profile.logout")}
        </Text>
      </Pressable>

      <Text className="mt-6 text-center font-tajawal text-xs text-muted-foreground">
        {t("profile.version")}
      </Text>
    </ScreenWrapper>
  );
}
