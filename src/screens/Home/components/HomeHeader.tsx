import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  UserRound,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { LanguageSelector } from "../../../components/common/LanguageSelector/LanguageSelector";
import { useLocale } from "../../../localization/i18n";
import { colors } from "../../../theme";

export function HomeHeader() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="px-4 pb-5 pt-2"
    >
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => router.push("/notifications")}
            className="relative h-9 w-9 items-center justify-center rounded-full bg-white/20"
          >
            <Bell size={17} color={colors.white} />
            <View className="absolute end-1 top-1 h-2 w-2 rounded-full border border-white bg-red-400" />
          </Pressable>
          <LanguageSelector />
        </View>

        <View className="items-center">
          <Text className="font-tajawal text-[11px] text-white/70">
            {t("home.hello")}
          </Text>
          <Text className="font-tajawal-black text-base text-white">
            {t("home.userName")}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/profile")}
          className="h-9 w-9 items-center justify-center rounded-full border-2 border-white/40 bg-white/30"
        >
          <UserRound size={17} color={colors.white} />
        </Pressable>
      </View>

      <Pressable className="mb-3 flex-row items-center justify-center gap-1.5">
        <MapPin size={13} color="rgba(255,255,255,0.7)" />
        <Text className="font-tajawal-bold text-sm text-white">
          {t("home.city")}
        </Text>
        <ChevronDown size={13} color="rgba(255,255,255,0.7)" />
      </Pressable>

      <View className="min-h-[52px] flex-row items-center gap-3 rounded-2xl bg-card px-4 py-3.5 shadow-card">
        <Pressable
          onPress={() => router.push("/listing")}
          className="flex-row items-center gap-1.5 rounded-xl bg-secondary px-2.5 py-1.5"
        >
          <SlidersHorizontal size={12} color={colors.primary} />
          <Text className="font-tajawal-bold text-xs text-primary">
            {t("common.filter")}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/search")}
          className="min-h-[24px] flex-1 flex-row items-center gap-2"
        >
          <Text className="flex-1 font-tajawal text-sm text-muted-foreground">
            {t("home.searchPlaceholder")}
          </Text>
          <Search size={17} color={colors.mutedForeground} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}
