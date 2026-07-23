import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Car, MessageCircle, Navigation, Phone } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CarCard } from "../../components/common/Card/CarCard";
import { AppHeader } from "../../components/common/Header/AppHeader";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { cars } from "../../data/mock";
import { useLocale } from "../../localization/i18n";
import { colors } from "../../theme";

export function CompanyScreen() {
  const router = useRouter();
  const { t } = useLocale();

  const actions = [
    { Icon: Phone, label: t("company.call") },
    { Icon: MessageCircle, label: t("company.message") },
    { Icon: Navigation, label: t("company.location") },
  ];

  return (
    <ScreenWrapper className="flex-1 bg-background" edges={[]} withSafeArea={false}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pb-5 pt-12"
      >
        <AppHeader
          title={t("company.title")}
          onBack={() => router.back()}
          light
        />
        <View className="items-center pt-2">
          <View className="mb-3 h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-card">
            <Car size={36} color={colors.primary} />
          </View>
          <Text className="font-tajawal-black text-xl text-white">
            {t("company.name")}
          </Text>
          <Text className="mt-1 font-tajawal text-sm text-white/80">
            ★ 4.8 · 312
          </Text>
          <View className="mt-2.5 flex-row gap-2">
            {[
              t("company.verified"),
              t("company.established"),
              t("company.branches"),
            ].map((tag) => (
              <Text
                key={tag}
                className="rounded-full bg-white/20 px-2.5 py-1 font-tajawal-bold text-[10px] text-white"
              >
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4">
          <View className="mb-3 flex-row items-center justify-between px-4">
            <Pressable onPress={() => router.push("/listing")}>
              <Text className="font-tajawal-medium text-sm text-primary">
                {t("common.seeAll")}
              </Text>
            </Pressable>
            <Text className="font-tajawal-black text-base text-foreground">
              {t("company.availableCars")}
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3 px-4"
          >
            {cars.slice(0, 3).map((car) => (
              <CarCard
                key={car.id}
                car={car}
                compact
                onPress={() => router.push(`/details/${car.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mx-4 mt-3 rounded-2xl bg-card p-4 shadow-card">
          <Text className="mb-3 text-end font-tajawal-black text-base text-foreground">
            {t("company.contact")}
          </Text>
          <View className="flex-row gap-3">
            {actions.map((action) => {
              const Icon = action.Icon;
              return (
                <Pressable
                  key={action.label}
                  className="flex-1 items-center gap-1.5 rounded-2xl bg-secondary py-3"
                >
                  <Icon size={20} color={colors.primary} />
                  <Text className="font-tajawal-bold text-[11px] text-primary">
                    {action.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
