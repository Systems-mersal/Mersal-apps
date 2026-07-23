import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { CarCard } from "../../components/common/Card/CarCard";
import { AppHeader } from "../../components/common/Header/AppHeader";
import { ScreenWrapper } from "../../components/common/ScreenWrapper/ScreenWrapper";
import { cars } from "../../data/mock";
import { useLocale } from "../../localization/i18n";

export function FavoritesScreen() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="bg-card">
        <AppHeader title={t("favorites.title")} onBack={() => router.back()} />
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-3 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-3 text-end font-tajawal text-[11px] text-muted-foreground">
          {t("favorites.savedCount")}
        </Text>
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {cars.slice(0, 4).map((car) => (
            <View key={car.id} className="w-[48%]">
              <CarCard
                car={car}
                onPress={() => router.push(`/details/${car.id}`)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
